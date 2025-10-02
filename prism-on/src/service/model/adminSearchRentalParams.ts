export type AdminSearchRentalParams = {
  /**
   * 페이지 번호
   */
  page?: number;
  /**
   * 페이지당 아이템수
   */
  limit?: number;
  /**
   * 검색어
   */
  searchQuery?: string;
  /**
   * 검색 범위
   */
  searchType?: string;
  /**
   * 정렬 칼럼
   */
  sortColumn?: string;
  /**
   * 정렬 방식
   */
  sortType?: string;
};
