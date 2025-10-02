import type { PaginateMetaDto } from './paginateMetaDto';
import type { UserDto } from './userDto';

export interface UserListAdminDto {
  /** 페이지 메타 정보 */
  meta?: PaginateMetaDto;
  /** 사용자 목록 */
  items: UserDto[];
}
