export interface PaginateMetaDto {
  /** 전체 아이템수 */
  totalItems: number;
  /** 현재 페이지 아이템수 */
  itemCount: number;
  /** 페이지당 아이템수 */
  itemsPerPage: number;
  /** 전체 페이지수 */
  totalPages: number;
  /** 현재 페이지 */
  currentPage: number;
}
