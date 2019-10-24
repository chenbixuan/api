'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, ENUM, DATE, INTEGER } = app.Sequelize;
  const Appointment = app.model.define('appointment', {
    no: {
      type: STRING(32),
      comment: '单号',
    },
    type: {
      type: ENUM('HFTY', 'ZTSY', 'CJYP', 'DZFW'),
      defaultValue: 'ZTSY',
      comment: '订单类型：HFTY-汉服/变装体验，ZTSY-主题摄影，CJYP-出街约拍，DZFW-定制服务',
    },
    status: {
      type: ENUM('WAITING', 'FINISHED', 'CANCELED'),
      defaultValue: 'WAITING',
      comment: '状态；WAITING-未完成，FINISHED-已完成，CANCELED-已取消',
    },
    date: {
      type: DATE(6),
      allowNull: false,
      comment: '',
    },
    period: {
      type: STRING(12),
      allowNull: false,
      comment: '时间段',
    },
    shopId: {
      type: INTEGER,
      comment: '店铺id',
    }
  }, {
    tableName: 'appointment',
  });

  return class extends Appointment {
  }
}
