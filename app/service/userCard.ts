'use strict';

import { Context } from 'egg';
// import { CreateOptions, FindAndCountOptions} from 'sequelize';
import moment from 'moment';

interface IData {
  [key: string]: any,
}

class UserCard extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.UserCard);
  }

  async generateCard(cardId: number, userId: number): Promise<IData> {
    const card = await this.service.card.find(cardId);
    if (!card) this.ctx.throw('卡券不存在');

    const data = card.dataValues;
    data.userId = userId;
    data.cardId = cardId;
    data.expire = new Date(moment().add(card.expire, 'M').valueOf());
    data.no = 'UC' + moment().format('YYYYMMDD') + this.ctx.helper.rand(4, 'number');
    // TODO 验证券限制类型
    return this.model.create(data);
  }
}

module.exports = UserCard;
