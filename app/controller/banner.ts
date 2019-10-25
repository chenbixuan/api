'use strict';

import { Context } from 'egg';

export default class BannerController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.banner);
  }

  async index () {
    const banners = await this.service.banner.model.findAll({
    }, {
      order: [
        ['sort', 'DESC'],
        ['id', 'DESC']
      ]
    });

    const data = {};
    banners.map(banner => {
      const type = banner.type;
      if (data[type]) {
        data[type].push(banner);
      } else {
        data[type] = [banner];
      }
    })
    this.ctx.body = data;
  }
}
