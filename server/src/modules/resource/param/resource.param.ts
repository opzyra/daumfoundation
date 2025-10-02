import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class ResourceParam {
  @IsNotEmpty()
  @ApiProperty({ format: 'binary', description: '첨부 파일' })
  file: string;
}
