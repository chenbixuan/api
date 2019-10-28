'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, ENUM, INTEGER } = app.Sequelize;
  const File = app.model.define('file', {
    name: {
      type: STRING,
      allowNull: false,
      comment: '文件名',
    },
    type: {
      type: ENUM('IMAGE', 'VIDEO'),
      defaultValue: 'IMAGE',
      comment: '文件类型',
    },
    size: {
      type: INTEGER,
      defaultValue: 0,
      comment: '文件大小',
    },
    path: {
      type: STRING,
      allowNull: false,
      comment: '相对路径',
    },
  }, {
    tableName: 'file',
  });

  return class extends File {
  }
}

