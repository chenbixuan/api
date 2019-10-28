'use strict';

import { Context } from 'egg';

class UserCard extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.UserCard);
  }
}

module.exports = UserCard;
