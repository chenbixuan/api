'use strict';

import { EggPlugin } from 'egg';

const plugin: EggPlugin = {};

plugin.sequelize = {
  package: 'egg-sequelize',
  enable: true,
};

plugin.cors = {
  enable: true,
  package: 'egg-cors',
}

export default plugin;
