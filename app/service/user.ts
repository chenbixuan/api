'use strict';

import { Context } from 'egg';

class User extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.User);
  }
}

module.exports = User;
