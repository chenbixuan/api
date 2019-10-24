'use strict';

import { Context } from 'egg';

export default class TestController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.appointment);
  }

  async index() {
    this.ctx.body = 'ok...';
  }
}
