'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, INTEGER, TINYINT, FLOAT, DATEONLY } = app.Sequelize;
  const WxUser = app.model.define('wxUser', {
    openId: {
      type: STRING(32),
      allowNull: false,
      comment: '微信id',
    },
    unionId: {
      type: STRING(32),
      comment: '微信开放平台id',
    },
    nickname: {
      type: STRING(28),
      allowNull: false,
      comment: '昵称',
    },
    realName: {
      type: STRING(32),
      comment: '真实姓名',
    },
    title: {
      type: STRING(4),
      comment: '称谓：bm-保密，xj-小姐，xz-小主，sx-少侠，gz-公子',
    },
    phoneNumber: {
      type: STRING(11),
      comment: '手机号',
    },
    jf: {
      type: INTEGER,
      defaultValue: 0,
      comment: '积分',
    },
    appointmentCount: {
      type: INTEGER,
      defaultValue: 0,
      comment: '消费总次数',
    },
    appointmentAmount: {
      type: FLOAT,
      defaultValue: 0,
      comment: '消费总金额',
    },
    gender: {
      type: TINYINT,
      defaultValue: 0,
      comment: '性别：0-未知，1-男，2-女',
    },
    birth: {
      type: DATEONLY,
      comment: '生日',
    },
    avatarUrl: {
      type: STRING(255),
      comment: '头像url',
    },
    country: {
      type: STRING(32),
      comment: '国家',
    },
    province: {
      type: STRING(32),
      comment: '省'
    },
    city: {
      type: STRING(32),
      comment: '城市',
    },
    language: {
      type: STRING(8),
      comment: '语言：en-英文，zh_CN-简体中文，zh_TW-繁体中文',
    },
    joinAt: {
      type: DATEONLY,
      defaultValue: new Date,
      comment: '入会时间',
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: '用户id',
    },
  }, {
    tableName: 'wx_user',
    hooks: {
    },
  });

  return class extends WxUser {
    static associate() {
      app.model.WxUser.belongsTo(app.model.User, { as: 'user', foreignKey: 'userId' });
    }
  }
}
