import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';

import { ResourceValue } from 'src/common/decorator/transform.decorator';

export class ResourceDto {
  @AutoMap()
  @ApiProperty({ description: 'PK' })
  id: number;

  @AutoMap()
  @ApiProperty({ description: '모듈' })
  module: string;

  @AutoMap()
  @ApiProperty({ description: '미디어 타입' })
  mimetype: string;

  @AutoMap()
  @ApiProperty({ description: '파일명' })
  originalname: string;

  @AutoMap()
  @ApiProperty({ description: '확장자' })
  extension: string;

  @AutoMap()
  @ApiProperty({ description: '전체 파일명' })
  fullname: string;

  @AutoMap()
  @ResourceValue()
  @ApiProperty({ description: '저장 경로' })
  path: string;

  @AutoMap()
  @ApiProperty({ description: '파일 용량' })
  size: number;

  @AutoMap()
  @ApiProperty({
    description: '등록 일시',
  })
  createdAt: Date;
}
