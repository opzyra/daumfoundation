import { AutoMap } from '@automapper/classes';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { ArticleGroup } from './article.group.entity';

@Table({
  tableName: 'tb_article_board',
  paranoid: false,
  timestamps: false,
  underscored: true,
})
export class ArticleBoard extends Model {
  @AutoMap()
  @Column({ type: DataType.CHAR(36), primaryKey: true, comment: '네임키' })
  namekey: string;

  @AutoMap()
  @Column({ comment: '게시판명' })
  name: string;

  @AutoMap()
  @Column({ defaultValue: 'list', comment: '뷰타입' })
  view: 'list' | 'image';

  @AutoMap()
  @Column({ defaultValue: false, comment: '전체 목록 사용 여부' })
  flatten: boolean;

  @AutoMap()
  @Column({ defaultValue: false, comment: '최신글 사용 여부' })
  latest: boolean;

  @AutoMap()
  @Column({ defaultValue: false, comment: '썸네일 사용 여부' })
  thumbnail: boolean;

  @AutoMap()
  @Column({ allowNull: true, comment: '썸네일 가로 크기' })
  thumbWidth: number;

  @AutoMap()
  @Column({ allowNull: true, comment: '썸네일 세로 크기' })
  thumbHeight: number;

  @AutoMap()
  @Column({ defaultValue: 0, comment: '우선순위' })
  priority: number;

  @AutoMap(() => ArticleGroup)
  @HasMany(() => ArticleGroup)
  group: ArticleGroup[];
}
