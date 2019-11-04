'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { BOOLEAN, INTEGER } = app.Sequelize;
  const AdminUser = app.model.define('adminUser', {
    enable: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '是否启用',
    },
    userId: {
      type: INTEGER,
      allowNull: false,
      comment: '关联user',
    },
  }, {
    tableName: 'admin_user',
  });

  return class extends AdminUser {
    static associate() {
      app.model.AdminUser.belongsTo(app.model.User, { as: 'user', foreignKey: 'userId' });
    }
  }
}
