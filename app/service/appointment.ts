'use strict';

import { Context } from 'egg';

export default class Appointment extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.Appointment);
  }
}
