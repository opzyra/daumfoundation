import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';

export class ArticleGroupDto {
  @AutoMap()
  @ApiProperty({ description: '네임키' })
  namekey: string;

  @AutoMap()
  @ApiProperty({ description: '그룹명' })
  name: string;

  @AutoMap()
  @ApiProperty({ description: '우선 순위' })
  priority: number;
}
