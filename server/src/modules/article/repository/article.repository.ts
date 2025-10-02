import { Injectable } from '@nestjs/common';

import { FindAndCountOptions, FindOptions, Transaction } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

import { Article } from 'src/modules/article/entity/article.entity';

@Injectable()
export class ArticleRepository {
  private model: ModelCtor<Article>;

  constructor() {
    this.model = Article;
  }

  async findAll(findOptions?: FindOptions<Article>, transaction?: Transaction) {
    return await this.model.findAll({
      ...findOptions,
      transaction,
    });
  }

  async findAndCountAll(
    findAndCountOptions?: FindAndCountOptions<Article>,
    transaction?: Transaction,
  ) {
    return await this.model.findAndCountAll({
      ...findAndCountOptions,
      transaction,
    });
  }

  async findOne(findOptions: FindOptions<Article>, transaction?: Transaction) {
    return await this.model.findOne({
      ...findOptions,
      transaction,
    });
  }

  async count(findOptions: FindOptions<Article>, transaction?: Transaction) {
    return await this.model.count({ ...findOptions, transaction });
  }

  async create(param: ModelAttributes<Article>, transaction?: Transaction) {
    return await this.model.create({ ...param }, { transaction });
  }

  async update(
    id: number,
    param: ModelAttributes<Article>,
    transaction?: Transaction,
  ) {
    await this.model.update({ ...param }, { where: { id }, transaction });
  }

  async delete(id: number, transaction?: Transaction) {
    await this.model.destroy({ where: { id }, transaction });
  }
}
