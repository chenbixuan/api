'use strict';

import { Application } from 'egg';
// import moment from 'moment';

export default function(app: Application) {
  const { STRING, ENUM, INTEGER, DATE } = app.Sequelize;
  const UserCard = app.model.define('userCard', {
    no: {
      type: STRING(32),
      comment: '券号',
    },
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
      type: DATE,
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
    status: {
      type: ENUM('UNUSED', 'USED'),
      defaultValue: 'UNUSED',
      comment: '状态：UNUSED-未使用，USED-已使用',
    },
    shopId: {
      type: INTEGER,
      defaultValue: 0,
      comment: '限定门店，0/null-不限制',
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: '所属用户'
    },
    cardId: {
      type: INTEGER,
      allowNull: false,
      comment: '所属card',
    },
  }, {
    tableName: 'user_card',
    // hooks: {
    //   beforeCreate: (info) => {
    //     // @ts-ignore
    //     info.no = 'UC' + moment().format('YYYYMMDD') + app.context.helper.rand(4, 'number');
    //   },
    // }
  });

  return class extends UserCard {
  }
}
