import { Injectable } from '@nestjs/common';

import { FindOptions, Includeable, Transaction } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

import { Resource } from 'src/modules/resource/entity/resource.entity';

@Injectable()
export class ResourceRepository {
  private model: ModelCtor<Resource>;
  private readonly include: Includeable[];

  constructor() {
    this.model = Resource;
    this.include = [];
  }

  async findAll(
    findOptions?: FindOptions<Resource>,
    transaction?: Transaction,
  ) {
    // relation
    const include = this.include;

    return await this.model.findAll({
      include,
      ...findOptions,
      transaction,
    });
  }

  async findOne(findOptions: FindOptions<Resource>, transaction?: Transaction) {
    // relation
    const include = this.include;

    return await this.model.findOne({
      include,
      ...findOptions,
      transaction,
    });
  }

  async count(findOptions: FindOptions<Resource>, transaction?: Transaction) {
    return await this.model.count({ ...findOptions, transaction });
  }

  async create(param: ModelAttributes<Resource>, transaction?: Transaction) {
    return await this.model.create({ ...param }, { transaction });
  }

  async update(
    id: number,
    param: ModelAttributes<Resource>,
    transaction?: Transaction,
  ) {
    await this.model.update({ ...param }, { where: { id }, transaction });
  }

  async delete(id: number, transaction?: Transaction) {
    await this.model.destroy({ where: { id }, transaction });
  }
}
