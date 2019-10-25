'use strict';

import { Context } from 'egg';

export default class Shop extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Shop);
  }
}
