import { Injectable } from '@nestjs/common';

import { FindOptions, Transaction } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

import { ArticleGroup } from 'src/modules/article/entity/article.group.entity';

@Injectable()
export class ArticleGroupRepository {
  private model: ModelCtor<ArticleGroup>;

  constructor() {
    this.model = ArticleGroup;
  }

  async findAll(
    findOptions?: FindOptions<ArticleGroup>,
    transaction?: Transaction,
  ) {
    // relation
    return await this.model.findAll({
      ...findOptions,
      transaction,
    });
  }

  async findOne(
    findOptions: FindOptions<ArticleGroup>,
    transaction?: Transaction,
  ) {
    return await this.model.findOne({
      ...findOptions,
      transaction,
    });
  }

  async count(
    findOptions: FindOptions<ArticleGroup>,
    transaction?: Transaction,
  ) {
    return await this.model.count({ ...findOptions, transaction });
  }

  async create(
    param: ModelAttributes<ArticleGroup>,
    transaction?: Transaction,
  ) {
    return await this.model.create({ ...param }, { transaction });
  }

  async update(
    id: number,
    param: ModelAttributes<ArticleGroup>,
    transaction?: Transaction,
  ) {
    await this.model.update({ ...param }, { where: { id }, transaction });
  }

  async delete(id: number, transaction?: Transaction) {
    await this.model.destroy({ where: { id }, transaction });
  }
}
