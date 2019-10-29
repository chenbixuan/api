'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, INTEGER, TINYINT, BOOLEAN, ENUM } = app.Sequelize;
  const Banner = app.model.define('banner', {
    title: {
      type: STRING,
      comment: '标题',
    },
    url: {
      type: STRING,
      comment: '跳转连接',
    },
    sort: {
      type: TINYINT,
      defaultValue: 1,
      comment: '排序',
    },
    enable: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '启用状态',
    },
    type: {
      type: ENUM('INDEX', 'INDEX_SERVICE', 'SERVICE1', 'SERVICE2'),
      defaultValue: 'INDEX',
      comment: '轮播类型：INDEX-首页轮播图，INDEX_SERVICE-首页服务轮播， SERVICE1-服务展示1， SERVICE2-服务展示2',
    },
    picId: {
      type: INTEGER,
      allowNull: false,
      comment: '图片id',
    },
  }, {
    tableName: 'banner',
  });

  return class extends Banner {
    static associate() {
      app.model.Banner.belongsTo(app.model.File, { as: 'file', foreignKey: 'picId' });
    }
  }
}
