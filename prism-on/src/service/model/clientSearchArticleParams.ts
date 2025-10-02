export type ClientSearchArticleParams = {
  /**
   * 페이지 번호
   */
  page?: number;
  /**
   * 페이지당 아이템수
   */
  limit?: number;
  /**
   * 게시판
   */
  board: string;
  /**
   * 회사
   */
  company: string;
  /**
   * 검색어
   */
  query?: string;
  /**
   * 다국어
   */
  locale?: string;
};
