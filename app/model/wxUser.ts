'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, INTEGER, TINYINT, DATE, BIGINT } = app.Sequelize;
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
      defaultValue: 'bm',
      comment: '称谓：bm-保密，xj-小姐，xz-小主，sx-少侠，gz-公子',
    },
    birth: {
      type: DATE(6),
      comment: '生日',
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
    avatarUrl: {
      type: STRING(255),
      comment: '头像url',
    },
    gender: {
      type: TINYINT,
      defaultValue: 0,
      comment: '性别：0-未知，1-男，2-女',
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
    userId: {
      type: INTEGER,
      comment: '用户id',
    },
    joinAt: {
      type: BIGINT,
      comment: '入会时间',
    },
  }, {
    tableName: 'wx_user',
  });

  return class extends WxUser {
    static associate() {
      // app.model.User.belongsTo(app.model.User, { as: 'user', foreignKey: 'userId' });
    }
  }
}
