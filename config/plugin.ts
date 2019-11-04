'use strict';

import { EggPlugin } from 'egg';

const plugin: EggPlugin = {};

// plugin.passport = {
//   enable: true,
//   package: 'egg-passport',
// };
//
// plugin.passwordLocal = {
//   enable: true,
//   package: 'passport-local',
// };

plugin.jwt = {
  enable: true,
  package: 'egg-jwt'
};

plugin.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

plugin.cors = {
  enable: true,
  package: 'egg-cors',
}

export default plugin;
