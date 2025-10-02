import type { PaginateMetaDto } from './paginateMetaDto';
import type { ProductDto } from './productDto';

export interface ProductListClientDto {
  /** 페이지 메타 정보 */
  meta?: PaginateMetaDto;
  /** 제품 목록 */
  items: ProductDto[];
}
