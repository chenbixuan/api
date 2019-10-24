'use strict';

import { Context } from 'egg';

class Kz extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Kz);
  }
}

module.exports = Kz;
