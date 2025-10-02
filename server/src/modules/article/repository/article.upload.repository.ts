import { Injectable } from '@nestjs/common';

import { FindOptions, Transaction } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

import { ArticleUpload } from 'src/modules/article/entity/article.upload.entity';

@Injectable()
export class ArticleUploadRepository {
  private model: ModelCtor<ArticleUpload>;

  constructor() {
    this.model = ArticleUpload;
  }

  async findAll(
    findOptions?: FindOptions<ArticleUpload>,
    transaction?: Transaction,
  ) {
    return await this.model.findAll({
      ...findOptions,
      transaction,
    });
  }

  async findOne(
    findOptions: FindOptions<ArticleUpload>,
    transaction?: Transaction,
  ) {
    return await this.model.findOne({
      ...findOptions,
      transaction,
    });
  }

  async count(
    findOptions: FindOptions<ArticleUpload>,
    transaction?: Transaction,
  ) {
    return await this.model.count({ ...findOptions, transaction });
  }

  async create(
    param: ModelAttributes<ArticleUpload>,
    transaction?: Transaction,
  ) {
    return await this.model.create({ ...param }, { transaction });
  }

  async update(
    id: number,
    param: ModelAttributes<ArticleUpload>,
    transaction?: Transaction,
  ) {
    await this.model.update({ ...param }, { where: { id }, transaction });
  }

  async delete(id: number, transaction?: Transaction) {
    await this.model.destroy({ where: { id }, transaction });
  }
}
