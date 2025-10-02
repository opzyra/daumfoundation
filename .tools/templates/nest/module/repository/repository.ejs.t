---
to: <%= h.src() %>/modules/<%= name %>/repository/<%= name %>.repository.ts
Name: <%= Name = h.capitalize(name) %>
---
import { Injectable } from '@nestjs/common';

import {
  FindAndCountOptions,
  FindOptions,
  Transaction,
  WhereOptions,
} from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

import { <%= Name %> } from 'src/modules/<%= name %>/entity/<%= name %>.entity';

@Injectable()
export class <%= Name %>Repository {
  private model: ModelCtor<<%= Name %>>;

  constructor() {
    this.model = <%= Name %>;
  }

  async findAll(findOptions?: FindOptions<<%= Name %>>, transaction?: Transaction) {
    return await this.model.findAll({
      ...findOptions,
      transaction,
    });
  }

  async findAndCountAll(
    findAndCountOptions?: FindAndCountOptions<<%= Name %>>,
    transaction?: Transaction,
  ) {

    return await this.model.findAndCountAll({
      ...findAndCountOptions,
      transaction,
    });
  }

  async findOne(findOptions: FindOptions<<%= Name %>>, transaction?: Transaction) {
    return await this.model.findOne({
      ...findOptions,
      transaction,
    });
  }

  async count(findOptions: FindOptions<<%= Name %>>, transaction?: Transaction) {
    return await this.model.count({ ...findOptions, transaction });
  }

  async create(param: ModelAttributes<<%= Name %>>, transaction?: Transaction) {
    return await this.model.create({ ...param }, { transaction });
  }

  async update(
    id: number,
    param: ModelAttributes<<%= Name %>>,
    transaction?: Transaction,
  ) {
    await this.model.update({ ...param }, { where: { id }, transaction });
  }

  async bulkUpdate(
    where: WhereOptions<<%= Name %>>,
    param: ModelAttributes<<%= Name %>>,
    transaction?: Transaction,
  ) {
    await this.model.update({ ...param }, { where, transaction });
  }

  async upsert(
    param: ModelAttributes<<%= Name %>>,
    transaction?: Transaction,
  ) {
    await this.model.upsert({ ...param }, { transaction });
  }

  async delete(id: number, transaction?: Transaction) {
    await this.model.destroy({ where: { id }, transaction });
  }

  async bulkDelete(param: FindOptions<<%= Name %>>, transaction?: Transaction) {
    await this.model.destroy({ ...param, transaction });
  }
}
