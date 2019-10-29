'use strict';

import { Context } from 'egg';

export default class FileController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.file);
  }
}
