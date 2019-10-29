'use strict';

import { Application } from 'egg';
import { Op } from 'sequelize';

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
    url: {
      type: STRING(512),
      allowNull: false,
      comment: '相对路径',
    },
  }, {
    tableName: 'file',
  });

  return class extends File {
    static async getFile(id: string | number): Promise<any[]> {
      if (typeof id === 'number') id = id + '';
      return app.model.File.findAll({
        attributes: ['name', 'url'],
        where: {
          id: {
            [Op.in]: id.split(','),
          }
        }
      })
    }
  }
}

