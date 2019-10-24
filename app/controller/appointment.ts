'use strict';

import { Context } from 'egg';

export default class AppointmentController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.appointment);
  }
}
