'use strict';

import { Context } from 'egg';

export default class File extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.File);
  }
}
