import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { Column } from 'sequelize-typescript';

import { ArticleGroupDto } from 'src/modules/article/dto/article.group.dto';

export class ArticleBoardDto {
  @AutoMap()
  @ApiProperty({ description: '네임키' })
  namekey: string;

  @AutoMap()
  @ApiProperty({ description: '게시판명' })
  name: string;

  @AutoMap()
  @ApiProperty({ description: '뷰타입' })
  view: string;

  @AutoMap()
  @ApiProperty({ description: '전체 목록 사용 여부' })
  flatten: boolean;

  @AutoMap()
  @ApiProperty({ description: '썸네일 사용 여부' })
  thumbnail: boolean;

  @AutoMap()
  @ApiProperty({ description: '썸네일 가로 크기' })
  thumbWidth: number;

  @AutoMap()
  @ApiProperty({ description: '썸네일 세로 크기' })
  thumbHeight: number;

  @AutoMap()
  @Column({ defaultValue: 0, comment: '우선 순위' })
  priority: number;

  @AutoMap(() => [ArticleGroupDto])
  @Type(() => ArticleGroupDto)
  @ApiProperty({
    description: '그룹',
    isArray: true,
    type: ArticleGroupDto,
  })
  group: ArticleGroupDto[];
}
