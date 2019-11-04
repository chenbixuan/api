'use strict';

import { Context } from 'egg';

export default () => {
  return async function (ctx: Context, next) {
    const token = ctx.header.authorization;
    const { app } = ctx;
    if (token) {
      const user = await app.jwt.verify(token.split(' ')[1], app.config.jwt.secret);
      ctx.user = user;
    }
    await next();
  }
};
