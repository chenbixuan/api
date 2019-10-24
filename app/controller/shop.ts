'use strict';

import { Context } from 'egg';

export default class ShopController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.shop);
  }
}
