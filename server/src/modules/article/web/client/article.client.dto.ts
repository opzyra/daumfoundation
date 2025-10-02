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
