'use strict';

import { Context } from 'egg';

export default class Kz extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Kz);
  }
}
