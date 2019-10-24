'use strict';

import { Context } from 'egg';

export default class WxUserController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.wxUser);
  }
}
