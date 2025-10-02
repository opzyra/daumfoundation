import { Injectable } from '@nestjs/common';

import { FindOptions, Transaction } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

import { ArticleBoard } from 'src/modules/article/entity/article.board.entity';

@Injectable()
export class ArticleBoardRepository {
  private model: ModelCtor<ArticleBoard>;

  constructor() {
    this.model = ArticleBoard;
  }

  async findAll(
    findOptions?: FindOptions<ArticleBoard>,
    transaction?: Transaction,
  ) {
    return await this.model.findAll({
      ...findOptions,
      transaction,
    });
  }

  async findOne(
    findOptions: FindOptions<ArticleBoard>,
    transaction?: Transaction,
  ) {
    return await this.model.findOne({
      ...findOptions,
      transaction,
    });
  }

  async count(
    findOptions: FindOptions<ArticleBoard>,
    transaction?: Transaction,
  ) {
    return await this.model.count({ ...findOptions, transaction });
  }

  async create(
    param: ModelAttributes<ArticleBoard>,
    transaction?: Transaction,
  ) {
    return await this.model.create({ ...param }, { transaction });
  }

  async update(
    id: number,
    param: ModelAttributes<ArticleBoard>,
    transaction?: Transaction,
  ) {
    await this.model.update({ ...param }, { where: { id }, transaction });
  }

  async delete(id: number, transaction?: Transaction) {
    await this.model.destroy({ where: { id }, transaction });
  }
}
