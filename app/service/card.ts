'use strict';

import { Context } from 'egg';

export default class Card extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Card);
  }
}
