'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING } = app.Sequelize;
  const User = app.model.define('user', {
    // id: {
    //   type: INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    username: STRING(30),
    phoneNumber: STRING(11),
    password: STRING(32),
  }, {
    tableName: 'user',
  });

  return class extends User {
    static associate() {
      app.model.User.hasOne(app.model.WxUser, { as: 'wxUser', foreignKey: 'userId' });
    }
  }
}
