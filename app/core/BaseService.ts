'use strict';

import {Service, Context} from 'egg';
import {Model, CreateOptions, FindAndCountOptions} from 'sequelize';

class BaseModel extends Model {};

export interface IData {
  [key: string]: any
}

export default class BaseService extends Service {
  public model: typeof BaseModel;

  constructor (ctx: Context, model: typeof BaseModel) {
    super(ctx);
    this.model = model;
  }

  async list(options: FindAndCountOptions = {}): Promise<IData> {
    options = options || {};
    if (!options.order || options.order === []) options.order = [[ 'id', 'desc' ]];
    if (!options.limit) options.limit = 10;
    return this.model.findAndCountAll(options);
  }

  async find(id: number): Promise<IData> {
    const info = await this.model.findByPk(id);
    if (!info) {
      this.ctx.throw(404, `${this.model.name} not found`);
    }
    return <IData>info;
  }

  async create(info: CreateOptions): Promise<IData> {
    return this.model.create(info);
  }

  async update({ id, updates }: { id: number; updates: object }): Promise<IData> {
    const info = await this.model.findByPk(id);
    if (!info) {
      this.ctx.throw(404, `${this.model.name} not found`);
    }
    return info!.update(updates);
  }

  async del(id: number) {
    const info = await this.model.findByPk(id);
    if (!info) {
      this.ctx.throw(404, `${this.model.name} not found`);
    }
    return info!.destroy();
  }
};
