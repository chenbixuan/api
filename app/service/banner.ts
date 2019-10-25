'use strict';

import { Context } from 'egg';

class Banner extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Banner);
  }
}

module.exports = Banner;
