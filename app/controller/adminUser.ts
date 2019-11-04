'use strict';

import { Context } from 'egg';

export default class AdminUserController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.adminUser);
  }
}
