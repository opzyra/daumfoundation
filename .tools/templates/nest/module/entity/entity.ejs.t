---
to: <%= h.src() %>/modules/<%= name %>/entity/<%= name %>.entity.ts
Name: <%= Name = h.capitalize(name) %>
---
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
  tableName: 'tb_<%= name %>',
  modelName: '<%= name %>',
  paranoid: false,
  createdAt: true,
  updatedAt: false,
  underscored: true,
})
export class <%= Name %> extends Model<
  InferAttributes<<%= Name %>>,
  InferCreationAttributes<<%= Name %>>
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
  @CreatedAt
  @Column({
    comment: '등록 일시',
  })
  createdAt: Date;
}
