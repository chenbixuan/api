'use strict';

import { Controller, Context } from 'egg';

import BaseService from './BaseService';

export default class BaseController extends Controller {
  public one: BaseService;

  constructor (ctx: Context, service: BaseService) {
    super(ctx);
    this.one = service;
  }

  async index() {
    const ctx = this.ctx;
    const query = ctx.query;
    const limit = ctx.helper.parseInt(query.limit, 10);
    const offset = ctx.helper.parseInt(query.offset);
    delete query.limit;
    delete query.offset;
    const options = {
      limit,
      offset,
      where: query
    };
    ctx.body = await this.one.list(options);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await this.one.find(this.ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const user = await this.one.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    const body = ctx.request.body;
    ctx.body = await this.one.update({ id, updates: body });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await this.one.del(id);
    ctx.status = 200;
  }
}

