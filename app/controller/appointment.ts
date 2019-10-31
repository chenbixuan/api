'use strict';

import { Context } from 'egg';
import { Op } from 'sequelize';

export default class AppointmentController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.appointment);
  }

  async index () {
    const ctx = this.ctx;
    const date = ctx.query.date;
    if (date) {
      ctx.query.status = {
        [Op.in]: ['WAITING', 'FINISHED'],
      };
    }

    await super.index();
  }
}
