import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AdminDto {
  @AutoMap()
  @ApiProperty({ description: 'PK' })
  id: number;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: '아이디' })
  username: string;

  @AutoMap()
  @Exclude()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: '이름' })
  name: string;

  @AutoMap()
  @ApiProperty({ description: '연락처', required: false })
  phone?: string;

  @AutoMap()
  @ApiProperty({ description: '이메일', required: false })
  email?: string;

  @AutoMap()
  @ApiProperty({ description: '권한' })
  role: 'master' | 'manager';

  @AutoMap()
  @ApiProperty({ description: '계정 상태', required: false })
  status?: 'active' | 'disable';

  @AutoMap()
  @ApiProperty({ description: '메모', required: false })
  memo?: string;

  @AutoMap()
  @ApiProperty({ description: '최근 로그인일시', required: false })
  loginAt?: Date;

  @AutoMap()
  @ApiProperty({ description: '등록일시', required: false })
  createdAt?: Date;
}
