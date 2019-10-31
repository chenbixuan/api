'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, ENUM, INTEGER, FLOAT, DATEONLY } = app.Sequelize;
  const Appointment = app.model.define('appointment', {
    no: {
      type: STRING(32),
      comment: '单号',
    },
    price: {
      type: FLOAT,
      defaultValue: 0,
      comment: '总价'
    },
    cardDiscounts: {
      type: FLOAT,
      defaultValue: 0,
      comment: '优惠券抵扣金额'
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
      type: DATEONLY,
      allowNull: false,
      comment: '日期',
    },
    period: {
      type: STRING(12),
      allowNull: false,
      comment: '时间段',
    },
    shopId: {
      type: INTEGER,
      allowNull: false,
      comment: '店铺id',
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: '用户id'
    },
  }, {
    tableName: 'appointment',
    hooks: {
      afterFind: async (instances) => {
        if (!instances) return;

        if (Array.isArray(instances)) {
          for (const i of instances) {
            // @ts-ignore
            i.dataValues.shop = await i.getShop({ hooks: false });
            // @ts-ignore
            i.dataValues.wxUser = await app.model.WxUser.findOne({
              attributes: ['id', 'nickname'],
              where: {
                // @ts-ignore
                userId: i.userId,
              }
            });
          }
        } else {
          // @ts-ignore
          instances.dataValues.shop = await instances.getShop({ hooks: false });
          // @ts-ignore
          instances.dataValues.wxUser = await app.model.WxUser.findOne({
            // attributes: ['id', 'nickname'],
            where: {
              // @ts-ignore
              userId: instances.userId,
            }
          });
        }
      }
    },
  });

  return class extends Appointment {
    static associate() {
      app.model.Appointment.belongsTo(app.model.Shop, { as: 'shop', foreignKey: 'shopId' });
    }
  }
}
