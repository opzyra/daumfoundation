import type { PaginateMetaDto } from './paginateMetaDto';
import type { RentalDto } from './rentalDto';

export interface RentalListClientDto {
  /** 페이지 메타 정보 */
  meta?: PaginateMetaDto;
  /** 대여 목록 */
  items: RentalDto[];
}
