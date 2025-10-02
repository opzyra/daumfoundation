export type ClientSearchProductParams = {
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
  query?: string;
  /**
   * 상태
   */
  status?: string;
  /**
   * 카테고리
   */
  category?: number[];
  /**
   * 라벨
   */
  label?: number[];
};
