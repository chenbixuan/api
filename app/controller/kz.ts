'use strict';

import { Context } from 'egg';

export default class KzController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.kz);
  }
}
