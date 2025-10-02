import type { ArticleDto } from './articleDto';
import type { PaginateMetaDto } from './paginateMetaDto';

export interface ArticleListAdminDto {
  /** 페이지 메타 정보 */
  meta?: PaginateMetaDto;
  /** 아티클 목록 */
  items: ArticleDto[];
}
