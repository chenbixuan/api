'use strict';

import { Application } from 'egg';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

import BaseService from './core/BaseService';
import BaseController from './core/BaseController';

declare global {
  namespace NodeJS {
    interface Global {
      BaseService: typeof BaseService,
      BaseController: typeof BaseController,
    }
  }
}

export default function(app: Application) {
  const pre = path.resolve(__dirname, './controller');

  const readDir = (dir: string, cb: Function): void => {
    fs.readdirSync(dir).map((d: string) => {
      const fullPath = path.resolve(dir, d);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readDir(fullPath, cb);
      } else if (stat.isFile()) {
       cb(fullPath);
      }
    })
  };

  readDir(pre, (fullPath: string) => {
    const { dir, name } = path.parse(fullPath.replace(pre + '/', ''));
    const prefix = dir ? dir + '/' + name : name;
    const key = prefix.split('/').join('.');
    app.resources(name, '/api/' + prefix, _.get(app.controller, key));
  });

}
