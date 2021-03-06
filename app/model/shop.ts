'use strict';

import { Application } from 'egg';

export default function(app: Application) {
  const { STRING, BOOLEAN, INTEGER } = app.Sequelize;
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
    picId: {
      type: INTEGER,
      allowNull: false,
      comment: '门店背景图',
    },
    enable: {
      type: BOOLEAN,
      defaultValue: true,
      comment: '是否启用',
    },
  }, {
    tableName: 'shop',
    paranoid: true,
    hooks: {
      afterFind: async (info) => {
        if (!info) return;
        if (Array.isArray(info)) {
          for (const i of info) {
            // @ts-ignore
            i.dataValues.files = await app.model.File.getFile(i.picId);
          }
        } else {
          // @ts-ignore
          info.dataValues.files = await app.model.File.getFile(info.picId);
        }
      }
    }
  });

  return class extends Shop {
    static associate() {
      app.model.Shop.hasMany(app.model.Card, { as: 'cards', foreignKey: 'shopId' });
      app.model.Shop.hasMany(app.model.Appointment, { as: 'appointments', foreignKey: 'shopId' });
      app.model.Shop.belongsTo(app.model.File, { as: 'file', foreignKey: 'picId' });
    }
  }
}
