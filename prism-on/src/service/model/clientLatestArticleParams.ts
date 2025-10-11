export type ClientLatestArticleParams = {
  /**
   * 게시판
   */
  board?: string;
  /**
   * 그룹
   */
  group?: string;
  /**
   * 최대 아이템 수
   */
  limit: number;
};
