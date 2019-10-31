'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, BOOLEAN, TEXT, DATE } = app.Sequelize;
  const Kz = app.model.define('kz', {
    title: {
      type: TEXT,
      allowNull: false,
      comment: '标题',
    },
    picIds: {
      type: STRING(255),
      allowNull: false,
      comment: '照片id，逗号分隔',
    },
    date: {
      type: DATE,
      comment: '日期',
    },
    enable: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '启用状态',
    },
  }, {
    tableName: 'kz',
    hooks: {
      afterFind: async (info) => {
        if (!info) return;
        if (Array.isArray(info)) {
          for (const i of info) {
            // @ts-ignore
            i.dataValues.files = await app.model.File.getFile(i.picIds);
          }
        } else {
          // @ts-ignore
          info.dataValues.files = await app.model.File.getFile(info.picIds);
        }
      }
    },
  });

  return class extends Kz {
  }
}
