'use strict';

import _ from 'lodash';
import {Service, Context} from 'egg';
import {Model, CreateOptions, FindOptions} from 'sequelize';

class BaseModel extends Model {};

export interface IData {
  [key: string]: any
}

export interface IConnection {
  lists: IData[],
  count: number,
  hasNext: boolean,
  hasPrevious: boolean
}

export default class BaseService extends Service {
  public model: typeof BaseModel;

  constructor (ctx: Context, model: typeof BaseModel) {
    super(ctx);
    this.model = model;
  }

  async list(options: FindOptions = {}): Promise<IConnection> {
    return this.connection(options);
  }

  /**
   * 分页结构
   * @param options
   */
  async connection(options: FindOptions = {}): Promise<IConnection> {
    _.defaults(options, {
      offset: 0,
      limit: 10,
      order: [[ 'id', 'desc' ]]
    });

    const lists = await this.model.findAll(options);
    const count = await this.model.count({
      where: options.where,
      include: options.include
    });

    return {
      lists,
      count,
      // @ts-ignore
      hasNext: options.offset + options.limit < count,
      // @ts-ignore
      hasPrevious: options.offset > 0
    }
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
