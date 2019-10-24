'use strict';

import { Context } from 'egg';

class Card extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Card);
  }
}

module.exports = Card;
