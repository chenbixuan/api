'use strict';

import { Context } from 'egg';
import { CreateOptions } from 'sequelize';
import { IData } from '../core/BaseService';

export default class WxUser extends global.BaseService {
  constructor (ctx: Context) {
    super(ctx, ctx.model.WxUser);
  }

  async create (info: CreateOptions) {
    const user = await this.service.user.create(info);
    return this.model.create({
      ...info,
      userId: user.id,
    });
  }

  async serviceInfo (id: number) {
    const wxUser = <IData>await this.model.findByPk(id, {
      attributes: ['nickname', 'realName', 'phoneNumber', 'birth', 'gender', 'avatarUrl', 'appointmentCount', 'appointmentAmount', 'userId'],
    });
    if (!wxUser) return {};

    const appointmentModel = this.service.appointment.model;
    const userCardModel = this.service.userCard.model;
    const where = {
      userId: wxUser.userId,
    };
    const info = wxUser.dataValues;

    // 预约次数
    info.total = await appointmentModel.count({ where });
    // 到店次数
    info.finished = await appointmentModel.count({
      where: {
        ...where,
        status: 'FINISHED',
      },
    });
    // 取消次数
    info.canceled = await appointmentModel.count({
      where: {
        ...where,
        status: 'CANCELED',
      },
    });
    // 待到店
    info.waiting = info.total - info.finished - info.canceled;
    // 汉服体验
    info.hfty = await appointmentModel.count({
      where: {
        ...where,
        status: 'FINISHED',
        type: 'HFTY',
      },
    });
    // 汉服约拍
    info.cjyp = await appointmentModel.count({
      where: {
        ...where,
        status: 'FINISHED',
        type: 'CJYP',
      },
    });
    // 其他服务
    info.other = info.finished - info.hfty - info.cjyp;
    // 平均客单价
    info.avg = info.appointmentCount ? ( +info.appointmentAmount / +info.appointmentCount ).toFixed(2) : 0;
    // 最近消费日
    const lastOne = <IData>await appointmentModel.findOne({
      attributes: ['date'],
      where: {
        ...where,
        status: 'FINISHED',
      },
      // @ts-ignore
      hooks: false,
      order: [['date', 'DESC']],
    });
    info.lastDay = lastOne ? lastOne.date : '-';

    // 优惠券数
    info.cardCount = await userCardModel.count({
      where,
    });
    // 金额
    // @ts-ignore
    info.cardAmount = await userCardModel.sum('value', {
      where,
    }) || 0;
    // 已使用数
    info.usedCount = await userCardModel.count({
      where: {
        ...where,
        status: 'USED',
      }
    });
    // 已使用金额
    // @ts-ignore
    info.usedAmount = await userCardModel.sum('value', {
      where: {
        ...where,
        status: 'USED',
      }
    }) || 0;

    return info;
  }

}
