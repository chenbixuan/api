'use strict';

import { Context } from 'egg';

export default class CardController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.card);
  }
}
