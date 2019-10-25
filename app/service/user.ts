'use strict';

import { Context } from 'egg';

export default class User extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.User);
  }
}
