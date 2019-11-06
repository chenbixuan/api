'use strict';

import { Context } from 'egg';

export default class UserController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.user);
  }

  async index () {
    console.log('user', this.ctx.user);
    await super.index();
  }

  async login () {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({
      attributes: ['id', 'username', 'phoneNumber'],
      raw: true,
      where: {
        username,
        password,
      }
    });
    // @ts-ignore
    const token = ctx.helper.jwtSign(user);
    ctx.body = {
      token,
      user,
    }
  }
}

