'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING } = app.Sequelize;
  const Shop = app.model.define('shop', {
    name: {
      type: STRING(32),
      allowNull: false,
      comment: '店名',
    },
    addr: {
      type: STRING(64),
      allowNull: false,
      comment: '地址',
    },
    addrJc: {
      type: STRING(64),
      allowNull: false,
      comment: '驾车地址',
    },
    addrGj: {
      type: STRING(64),
      allowNull: false,
      comment: '公交地铁地址',
    },
    pic: {
      type: STRING(255),
      allowNull: false,
      comment: '门店背景图',
    }
  }, {
    tableName: 'shop',
  });

  return class extends Shop {
    static associate() {
      app.model.Shop.hasMany(app.model.Card, { as: 'cards', foreignKey: 'shopId', onDelete: 'CASCADE', hooks: true });
    }
  }
}
