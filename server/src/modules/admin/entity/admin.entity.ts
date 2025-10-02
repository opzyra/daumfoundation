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
  tableName: 'tb_admin',
  modelName: 'admin',
  paranoid: false,
  createdAt: true,
  updatedAt: false,
  underscored: true,
  indexes: [{ unique: true, fields: ['username'] }],
})
export class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin>
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
  @Column({ allowNull: true, comment: '아이디' })
  username?: string;

  @AutoMap()
  @Column({ allowNull: true, comment: '비밀번호' })
  password?: string;

  @AutoMap()
  @Column({ allowNull: true, comment: '이름' })
  name: string;

  @AutoMap()
  @Column({ allowNull: true, comment: '연락처' })
  phone: string;

  @AutoMap()
  @Column({ allowNull: true, comment: '이메일' })
  email: string;

  @AutoMap()
  @Column({ defaultValue: 'manager', comment: '권한' })
  role: 'master' | 'manager';

  @AutoMap()
  @Column({
    allowNull: true,
    defaultValue: 'active',
    comment: '계정 상태',
  })
  status?: 'active' | 'disable';

  @AutoMap()
  @Column({ type: DataType.TEXT('medium'), allowNull: true, comment: '메모' })
  memo?: string;

  @AutoMap()
  @Column({ allowNull: true, comment: '최근 로그인 일시' })
  loginAt: Date;

  @AutoMap()
  @CreatedAt
  @Column({
    comment: '등록 일시',
  })
  createdAt: Date;
}
