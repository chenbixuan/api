'use strict';

import moment from 'moment';
import { Context } from 'egg';
import { Op } from 'sequelize';

export default class AppointmentController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.appointment);
  }

  async my () {
    const ctx = this.ctx;
    const user = ctx.user;
    ctx.query.userId = user.id;
    return super.index();
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

  async create () {
    const user = this.ctx.user;
    if (!user) this.ctx.throw('未登录');

    // @ts-ignore
    this.ctx.request.body.userId = user.id;
    this.ctx.request.body.no = 'AP' + moment().format('YYYYMMDD') + this.ctx.helper.rand(4, 'number');
    return super.create()
  }
}
