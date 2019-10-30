'use strict';

import { Context } from 'egg';
import { Op } from 'sequelize';

export default class UserCardController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.userCard);
  }

  async create() {
    const ctx = this.ctx;
    const { userId, cardId } = ctx.request.body;
    if (!userId || !cardId) {
      ctx.throw(404, `参数错误`);
    }

    // @ts-ignore
    const userCard = await this.one.generateCard(cardId, userId);
    ctx.status = 201;
    ctx.body = userCard;
  }

  async index() {
    const ctx = this.ctx;
    const query = ctx.query;
    const status = query.status;
    if (status === 'OUT') {
      query.expire = {
        [Op.lt]: new Date(),
      }
      query.status = 'UNUSED';
    }
    await super.index();
  }
}
