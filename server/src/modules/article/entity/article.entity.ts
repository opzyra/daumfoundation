import { AutoMap } from '@automapper/classes';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { Admin } from 'src/modules/admin/entity/admin.entity';
import { ArticleBoard } from 'src/modules/article/entity/article.board.entity';
import { ArticleGroup } from 'src/modules/article/entity/article.group.entity';
import { ArticleUpload } from 'src/modules/article/entity/article.upload.entity';

@Table({
  tableName: 'tb_article',
  modelName: 'article',
  paranoid: false,
  createdAt: true,
  updatedAt: false,
  underscored: true,
  indexes: [
    {
      unique: false,
      name: 'created_at',
      fields: ['created_at'],
    },
  ],
})
export class Article extends Model<
  InferAttributes<Article>,
  InferCreationAttributes<Article>
> {
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
  @Column({ comment: '제목' })
  subject: string;

  @AutoMap()
  @Column({ allowNull: true, comment: '썸네일' })
  thumbnail: string;

  @AutoMap()
  @Column({ type: DataType.TEXT('medium'), comment: '내용' })
  content: string;

  @AutoMap()
  @Column({ defaultValue: 0, comment: '조회수' })
  hit: number;

  @AutoMap()
  @Column({ defaultValue: false, comment: '공지글 설정' })
  notice: boolean;

  @AutoMap()
  @Column({ defaultValue: false, comment: '비밀글 설정' })
  secret: boolean;

  @AutoMap()
  @Column({ comment: '작성자 이름' })
  author: string;

  @AutoMap()
  @Column({ comment: '작성자 아이디' })
  username: string;

  @AutoMap()
  @ForeignKey(() => ArticleBoard)
  @Column({ type: DataType.CHAR(36), comment: '게시판' })
  boardKey: string;

  @AutoMap()
  @BelongsTo(() => ArticleBoard)
  board: ArticleBoard;

  @ForeignKey(() => ArticleGroup)
  @Column({ type: DataType.CHAR(36), comment: '그룹' })
  groupKey: string;

  @AutoMap()
  @BelongsTo(() => ArticleGroup)
  group: ArticleGroup;

  @AutoMap()
  @ForeignKey(() => Admin)
  @Column({ comment: '작성자' })
  adminId: number;

  @AutoMap()
  @BelongsTo(() => Admin)
  admin: Admin;

  @AutoMap(() => [ArticleUpload])
  @HasMany(() => ArticleUpload)
  upload: ArticleUpload[];

  @AutoMap()
  @CreatedAt
  @Column({
    comment: '등록 일시',
  })
  createdAt: Date;
}
