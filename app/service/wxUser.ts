'use strict';

import { Context } from 'egg';
import { CreateOptions } from 'sequelize';

export default class WxUser extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.WxUser);
  }

  async create(info: CreateOptions) {
    const user = await this.service.user.create(info);
    return this.model.create({
      ...info,
      userId: user.id,
    });
  }

}
