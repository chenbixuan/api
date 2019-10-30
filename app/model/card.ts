'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, ENUM, INTEGER } = app.Sequelize;
  const Card = app.model.define('card', {
    name: {
      type: STRING(32),
      allowNull: false,
      comment: '卡券名称',
    },
    type: {
      type: ENUM('CASH'),
      defaultValue: 'CASH',
      comment: '类型：CASH-现金券',
    },
    value: {
      type: INTEGER,
      defaultValue: 0,
      comment: '面值',
    },
    expire: {
      type: INTEGER,
      defaultValue: 0,
      comment: '有效期',
    },
    userLimit: {
      type: ENUM('NEW', 'OLD', 'NONE'),
      defaultValue: 'NONE',
      comment: '限定用户：NEW-新用户，OLD-老用户，NONE-不限制',
    },
    limitType: {
      type: ENUM('REG', 'SHARE', 'NONE'),
      defaultValue: 'NONE',
      comment: '领取条件：REG：新用户注册，SHARE：分享获取，NONE-不限制',
    },
    count: {
      type: INTEGER,
      defaultValue: 0,
      comment: '发放数量',
    },
    remain: {
      type: INTEGER,
      defaultValue: 0,
      comment: '剩余数量',
    },
    shopId: {
      type: INTEGER,
      comment: '限定门店，0-不限制',
    },
  }, {
    tableName: 'card',
    hooks: {
      beforeCreate: (info) => {
        // @ts-ignore
        if (!info.remain) info.remain = info.count;
      }
    }
  });

  return class extends Card {
    static associate() {
      app.model.Card.hasMany(app.model.UserCard, { as: 'userCards', foreignKey: 'cardId' });
    }
  }
}
