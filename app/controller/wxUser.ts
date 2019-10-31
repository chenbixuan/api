'use strict';

import { Context } from 'egg';
import { Op } from 'sequelize';

export default class WxUserController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.wxUser);
  }

  async show() {
    const ctx = this.ctx;
    // @ts-ignore
    ctx.body = await this.one.serviceInfo(this.ctx.helper.parseInt(ctx.params.id));
  }

  async index () {
    const ctx = this.ctx;
    const { search } = ctx.query;
    if (search) {
      const like = {
        [Op.like]: `%${search}%`
      };
      ctx.query[Op.or] = {
        realName: like,
        phoneNumber: like,
      }
      delete ctx.query.search;
    }

    await super.index();
  }
}
