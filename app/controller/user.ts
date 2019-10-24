'use strict';

import { Context } from 'egg';

export default class UserController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.user);
  }
}

