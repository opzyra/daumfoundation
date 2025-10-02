import type { PaginateMetaDto } from './paginateMetaDto';
import type { TermDto } from './termDto';

export interface TermListAdminDto {
  /** 페이지 메타 정보 */
  meta?: PaginateMetaDto;
  /** 약관 목록 */
  items: TermDto[];
}
