'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING } = app.Sequelize;
  const User = app.model.define('user', {
    username: STRING(30),
    phoneNumber: STRING(11),
    password: STRING(32),
  }, {
    tableName: 'user',
  });

  return class extends User {
    static associate() {
      app.model.User.hasOne(app.model.WxUser, { as: 'wxUser', foreignKey: 'userId', hooks: true, onDelete: 'CASCADE' });
      app.model.User.hasMany(app.model.UserCard, { as: 'userCards', foreignKey: 'userId', hooks: true, onDelete: 'CASCADE' });
      app.model.User.hasMany(app.model.Appointment, { as: 'appointments', foreignKey: 'userId', hooks: true, onDelete: 'CASCADE' });
    }
  }
}
