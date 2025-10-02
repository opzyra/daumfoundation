import { ApiProperty } from '@nestjs/swagger';

export class PayloadDto {
  @ApiProperty({ description: 'PK' })
  id: string;

  @ApiProperty({ description: '아이디' })
  username: string;

  @ApiProperty({ description: '권한' })
  role: 'admin' | 'user';
}
