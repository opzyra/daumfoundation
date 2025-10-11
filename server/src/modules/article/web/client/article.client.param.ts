import { ApiProperty, PartialType } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Max } from 'class-validator';

import { UrlValue } from 'src/common/decorator/transform.decorator';
import { PaginateDto } from 'src/common/dto/paginate.dto';

export class ArticleLatestClientParam {
  @IsOptional()
  @ApiProperty({
    description: '게시판',
    required: false,
  })
  board: string;

  @IsOptional()
  @ApiProperty({
    description: '그룹',
    required: false,
  })
  group: string;

  @IsInt()
  @Type(() => Number)
  @Max(20)
  @IsOptional()
  @ApiProperty({ description: '최대 아이템 수' })
  limit?: number;
}

export class ArticleFlattenClientParam {
  @IsOptional()
  @ApiProperty({
    description: '게시판',
    required: false,
  })
  board: string;

  @IsOptional()
  @ApiProperty({
    description: '그룹',
    required: false,
  })
  group: string;
}

export class ArticleHitClientParam {
  @IsNotEmpty()
  @ApiProperty({
    description: '게시글 PK',
    required: true,
  })
  id: number;
}

export class ArticleQueryClientParam {
  @IsOptional()
  @UrlValue()
  @ApiProperty({
    description: '검색어',
    required: false,
  })
  query: string;
}

export class ArticleSearchClientParam extends PartialType(PaginateDto) {
  @IsNotEmpty()
  @ApiProperty({
    description: '게시판',
    required: true,
  })
  board: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '회사',
    required: true,
  })
  company: string;

  @IsOptional()
  @UrlValue()
  @ApiProperty({
    description: '검색어',
    required: false,
  })
  query: string;

  @IsOptional()
  @ApiProperty({
    description: '다국어',
    required: false,
  })
  locale: string;
}
