import { AutoMap } from '@automapper/classes';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { ArticleBoard } from './article.board.entity';

@Table({
  tableName: 'tb_article_group',
  paranoid: false,
  timestamps: false,
  underscored: true,
})
export class ArticleGroup extends Model {
  @AutoMap()
  @Column({ type: DataType.CHAR(36), primaryKey: true, comment: '네임키' })
  namekey: string;

  @AutoMap()
  @Column({ comment: '그룹명' })
  name: string;

  @AutoMap()
  @Column({ defaultValue: 0, comment: '우선순위' })
  priority: number;

  @ForeignKey(() => ArticleBoard)
  @Column({ type: DataType.CHAR(36) })
  boardKey: string;
}
