import { Injectable } from '@nestjs/common';

import {
  FindAndCountOptions,
  FindOptions,
  Includeable,
  Transaction,
  WhereOptions,
} from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

import { Admin } from 'src/modules/admin/entity/admin.entity';

@Injectable()
export class AdminRepository {
  private model: ModelCtor<Admin>;
  private readonly include: Includeable[];

  constructor() {
    this.model = Admin;
  }

  async findAll(findOptions?: FindOptions<Admin>, transaction?: Transaction) {
    return await this.model.findAll({
      ...findOptions,
      transaction,
    });
  }

  async findAndCountAll(
    findAndCountOptions?: FindAndCountOptions<Admin>,
    transaction?: Transaction,
  ) {
    return await this.model.findAndCountAll({
      ...findAndCountOptions,
      transaction,
    });
  }

  async findOne(findOptions: FindOptions<Admin>, transaction?: Transaction) {
    return await this.model.findOne({
      ...findOptions,
      transaction,
    });
  }

  async count(countOptions: FindOptions<Admin>, transaction?: Transaction) {
    return await this.model.count({
      ...countOptions,
      transaction,
    });
  }

  async create(param: ModelAttributes<Admin>, transaction?: Transaction) {
    return await this.model.create({ ...param }, { transaction });
  }

  async update(
    id: number,
    param: ModelAttributes<Admin>,
    transaction?: Transaction,
  ) {
    await this.model.update({ ...param }, { where: { id }, transaction });
  }

  async bulkUpdate(
    where: WhereOptions<Admin>,
    param: ModelAttributes<Admin>,
    transaction?: Transaction,
  ) {
    await this.model.update({ ...param }, { where, transaction });
  }

  async upsert(param: ModelAttributes<Admin>, transaction?: Transaction) {
    await this.model.upsert({ ...param }, { transaction });
  }

  async delete(id: number, transaction?: Transaction) {
    await this.model.destroy({ where: { id }, transaction });
  }

  async bulkDelete(param: FindOptions<Admin>, transaction?: Transaction) {
    await this.model.destroy({ ...param, transaction });
  }
}
