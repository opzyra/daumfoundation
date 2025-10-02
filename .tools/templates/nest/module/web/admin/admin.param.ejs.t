---
to: <%= h.src() %>/modules/<%= name %>/web/admin/<%= name %>.admin.param.ts
Name: <%= Name = h.capitalize(name) %>
---
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional } from 'class-validator';

import { IsInValue, UrlValue } from 'src/common/decorator/transform.decorator';
import { PaginateDto } from 'src/common/dto/paginate.dto';

import { <%= Name %>Dto } from 'src/modules/<%= name %>/dto/<%= name %>.dto';

export class <%= Name %>AdminParam extends OmitType(PartialType(<%= Name %>Dto), [
  'id',
]) {}

export class <%= Name %>SearchAdminParam extends PartialType(PaginateDto) {
  @IsOptional()
  @UrlValue()
  @ApiProperty({
    description: '검색어',
    required: false,
  })
  searchQuery?: string;

  @IsOptional()
  @IsInValue([''])
  @ApiProperty({
    description: '검색 범위',
    required: false,
    type: String,
  })
  searchType?: '';

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
}

export class <%= Name %>RemoveAdminParam {
  @IsNotEmpty()
  @ApiProperty({
    description: 'PK',
    required: true,
  })
  ids: number[];
}