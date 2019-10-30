'use strict';

import { Context } from 'egg';

export default class Banner extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Banner);
  }
}
