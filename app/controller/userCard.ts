'use strict';

import { Context } from 'egg';

export default class UserCardController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.userCard);
  }
}
