import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max } from 'class-validator';

export class PaginateDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ description: '페이지 번호' })
  page?: number;

  @IsInt()
  @Type(() => Number)
  @Max(100)
  @IsOptional()
  @ApiProperty({ description: '페이지당 아이템수' })
  limit?: number;
}

export class PaginateMetaDto {
  @ApiProperty({ description: '전체 아이템수' })
  totalItems: number;
  @ApiProperty({ description: '현재 페이지 아이템수' })
  itemCount: number;
  @ApiProperty({ description: '페이지당 아이템수' })
  itemsPerPage: number;
  @ApiProperty({ description: '전체 페이지수' })
  totalPages: number;
  @ApiProperty({ description: '현재 페이지' })
  currentPage: number;
}

export class PaginateListDto {
  @ApiProperty({ description: '페이지 메타 정보', type: PaginateMetaDto })
  meta: PaginateMetaDto;
}
