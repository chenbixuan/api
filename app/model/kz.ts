'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, BIGINT, BOOLEAN } = app.Sequelize;
  const Kz = app.model.define('kz', {
    title: {
      type: STRING(255),
      allowNull: false,
      comment: '标题',
    },
    pics: {
      type: STRING(255 * 9),
      allowNull: false,
      comment: '照片',
    },
    date: {
      type: BIGINT,
      allowNull: false,
      comment: '日期',
    },
    enabled: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '启用状态',
    },
  }, {
    tableName: 'kz',
  });

  return class extends Kz {
  }
}
