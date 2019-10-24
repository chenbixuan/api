'use strict';

import { Context } from 'egg';

class Appointment extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Appointment);
  }
}

module.exports = Appointment;
