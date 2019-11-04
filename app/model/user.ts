'use strict';

import { Application } from 'egg';
import bcrypt from 'bcrypt';

export default function(app: Application) {
  const { STRING, BOOLEAN, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    username: STRING(30),
    phoneNumber: STRING(11),
    password: {
      type: STRING(64),
    },
    enable: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '是否启用',
    },
    loginIp: {
      type: STRING,
      comment: '上次登录ip',
    },
    loginAt: {
      type: DATE,
      comment: '上次登录时间',
    },
  }, {
    tableName: 'user',
    hooks: {
      beforeCreate: async (data) => {
        // @ts-ignore
        data.password = bcrypt.hashSync(data.password, 10);
      },
    },
  });

  return class extends User {
    static associate() {
      app.model.User.hasOne(app.model.WxUser, { as: 'wxUser', foreignKey: 'userId', hooks: true, onDelete: 'CASCADE' });
      app.model.User.hasOne(app.model.AdminUser, { as: 'adminUser', foreignKey: 'userId', hooks: true, onDelete: 'CASCADE' });
      app.model.User.hasMany(app.model.UserCard, { as: 'userCards', foreignKey: 'userId', hooks: true, onDelete: 'CASCADE' });
      app.model.User.hasMany(app.model.Appointment, { as: 'appointments', foreignKey: 'userId', hooks: true, onDelete: 'CASCADE' });
    }
  }
}
