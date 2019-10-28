'use strict';

import { Context } from 'egg';

class File extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.File);
  }
}

module.exports = File;
