'use strict';

import { Context } from 'egg';

class Shop extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Shop);
  }
}

module.exports = Shop;
