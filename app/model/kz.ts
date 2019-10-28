'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, BIGINT, BOOLEAN, TEXT } = app.Sequelize;
  const Kz = app.model.define('kz', {
    title: {
      type: TEXT,
      allowNull: false,
      comment: '标题',
    },
    pics: {
      type: STRING(255),
      allowNull: false,
      comment: '照片id，逗号分隔',
    },
    date: {
      type: BIGINT,
      allowNull: false,
      comment: '日期',
    },
    enable: {
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
