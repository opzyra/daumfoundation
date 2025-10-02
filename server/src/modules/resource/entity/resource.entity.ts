import { AutoMap } from '@automapper/classes';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'tb_resource',
  modelName: 'resource',
  paranoid: false,
  createdAt: true,
  updatedAt: false,
  underscored: true,
})
export class Resource extends Model<
  InferAttributes<Resource>,
  InferCreationAttributes<Resource>
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
  @Column({ comment: '모듈' })
  module: 'article';

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

  @AutoMap()
  @CreatedAt
  @Column({
    comment: '등록 일시',
  })
  createdAt: Date;
}
