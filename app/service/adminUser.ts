'use strict';

import { Context } from 'egg';

export default class AdminUser extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.AdminUser);
  }
}
