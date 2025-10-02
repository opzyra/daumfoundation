import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Article } from 'src/modules/article/entity/article.entity';

@Table({
  tableName: 'tb_article_upload',
  paranoid: false,
  createdAt: true,
  updatedAt: false,
  underscored: true,
})
export class ArticleUpload extends Model {
  @AutoMap()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    comment: 'PK',
  })
  id: number;

  @AutoMap()
  @Column({ comment: '미디어 타입' })
  mimetype: string;

  @AutoMap()
  @Column({ comment: '파일명' })
  originalname: string;

  @AutoMap()
  @Column({ comment: '확장자' })
  extension: string;

  @AutoMap()
  @Column({ comment: '전체 파일명' })
  fullname: string;

  @AutoMap()
  @Column({ comment: '저장 경로' })
  path: string;

  @AutoMap()
  @Column({ comment: '파일 용량' })
  size: number;

  @ForeignKey(() => Article)
  @Column({ type: DataType.INTEGER })
  articleId: number;

  @AutoMap()
  @CreatedAt
  createdAt: Date;
}
