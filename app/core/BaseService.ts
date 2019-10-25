'use strict';

import {Service, Context} from 'egg';
import {Model, CreateOptions} from 'sequelize';

class BaseModel extends Model {};

interface IData {
  [key: string]: any
}

export default class BaseService extends Service {
  public model: typeof BaseModel;

  constructor (ctx: Context, model: typeof BaseModel) {
    super(ctx);
    this.model = model;
  }

  async list({ offset = 0, limit = 10 }: { offset: number; limit: number; }) {
    if (limit === 0) limit = 10;
    return this.model.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id: number) {
    const info = await this.model.findByPk(id);
    if (!info) {
      this.ctx.throw(404, `${this.model.name} not found`);
    }
    return info;
  }

  async create(info: CreateOptions): Promise<IData> {
    return this.model.create(info);
  }

  async update({ id, updates }: { id: number; updates: object }) {
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
