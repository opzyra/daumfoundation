import type { AdminDto } from './adminDto';
import type { PaginateMetaDto } from './paginateMetaDto';

export interface AdminListAdminDto {
  /** 페이지 메타 정보 */
  meta?: PaginateMetaDto;
  /** 관리자 목록 */
  items: AdminDto[];
}
