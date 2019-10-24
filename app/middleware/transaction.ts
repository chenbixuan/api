'use strict';

import { Context } from 'egg';

module.exports = () => {
  return async function (ctx: Context, next) {
    if (ctx.req.method === 'GET') {
      await next();
    } else {
      await ctx.model.modelManager.sequelize.transaction(async () => {
        await next();
      });
    }
  }
};
