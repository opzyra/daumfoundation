import { ApiProperty, PartialType } from '@nestjs/swagger';

import { PaginateListDto } from 'src/common/dto/paginate.dto';

import { ArticleDto } from 'src/modules/article/dto/article.dto';

export class ArticleListClientDto extends PartialType(PaginateListDto) {
  @ApiProperty({
    description: '아티클 목록',
    isArray: true,
    type: ArticleDto,
  })
  items: Array<ArticleDto>;
}

export class ArticleSurroundClientDto {
  @ApiProperty({ description: '이전 게시글', type: ArticleDto })
  prev: ArticleDto;

  @ApiProperty({ description: '다음 게시글', type: ArticleDto })
  next: ArticleDto;
}
