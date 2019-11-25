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

  async getOpenId() {
    //openid, session_key, expires_in
    const { openid: openId } = await this.ctx.helper.code2Session(this.ctx.query.code);
    this.ctx.body = {
      openId,
    };
  }

  async update() {
    const ctx = this.ctx;
    const user = ctx.user;
    const body = ctx.request.body;
    ctx.body = await this.one.model.update(body, {
      where: {
        userId: user.id,
      },
    });
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
