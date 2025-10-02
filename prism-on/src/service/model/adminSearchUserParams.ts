export type AdminSearchUserParams = {
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
  /**
   * 권한
   */
  role?: string;
  /**
   * 휴대폰 번호
   */
  phone?: string;
  /**
   * 상태
   */
  status?: string;
  /**
   * 마케팅 동의 여부
   */
  marketing?: boolean;
};
