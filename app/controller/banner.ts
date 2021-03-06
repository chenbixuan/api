'use strict';

import { Context } from 'egg';
import _ from 'lodash';

export default class BannerController extends global.BaseController {
  constructor (ctx: Context) {
    super(ctx, ctx.service.banner);
  }

  async index () {
    const type = _.get(this.ctx.query, 'type', null);
    const enable = _.get(this.ctx.query, 'enable');
    const where: {
      type?: string,
      enable?: boolean,
    } = {};
    if (type) where.type = type;
    if (enable) where.enable = enable === 'true';

    const banners = await this.one.model.findAll({
      where,
      include: [
        {
          model: this.service.file.model,
          as: 'file',
          attributes: ['name', 'url'],
        }
      ],
    // @ts-ignore
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
