import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional } from 'class-validator';

import { IsInValue, UrlValue } from 'src/common/decorator/transform.decorator';
import { PaginateDto } from 'src/common/dto/paginate.dto';

import { ArticleDto } from 'src/modules/article/dto/article.dto';

export class ArticleAdminParam extends OmitType(PartialType(ArticleDto), [
  'id',
]) {
  @IsOptional()
  @ApiProperty({ description: '썸네일 자동추출', required: false })
  extract?: boolean;
}

export class ArticleSearchAdminParam extends PartialType(PaginateDto) {
  @IsOptional()
  @UrlValue()
  @ApiProperty({
    description: '검색어',
    required: false,
  })
  searchQuery?: string;

  @IsOptional()
  @IsInValue(['subject', 'content'])
  @ApiProperty({
    description: '검색 범위',
    required: false,
    type: String,
  })
  searchType?: 'subject' | 'content';

  @IsOptional()
  @IsInValue(['createdAt'])
  @ApiProperty({
    description: '정렬 칼럼',
    required: false,
    type: String,
  })
  sortColumn?: 'createdAt';

  @IsOptional()
  @IsInValue(['asc', 'desc'])
  @ApiProperty({
    description: '정렬 방식',
    required: false,
    type: String,
  })
  sortType?: 'asc' | 'desc';

  @IsOptional()
  @ApiProperty({
    description: '게시판',
    required: false,
  })
  board?: string;

  @IsOptional()
  @ApiProperty({
    description: '그룹',
    required: false,
  })
  group?: string;

  @IsOptional()
  @ApiProperty({
    description: '상태',
    required: false,
  })
  status: string;
}

export class ArticleRemoveAdminParam {
  @IsNotEmpty()
  @ApiProperty({
    description: 'PK',
    required: true,
  })
  ids: number[];
}

export class ArticleUploadAdminParam {
  @IsNotEmpty()
  @ApiProperty({ format: 'binary', description: '첨부 파일' })
  file: string;
}
