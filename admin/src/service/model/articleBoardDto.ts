import type { ArticleGroupDto } from './articleGroupDto';

export interface ArticleBoardDto {
  /** 네임키 */
  namekey: string;
  /** 게시판명 */
  name: string;
  /** 뷰타입 */
  view: string;
  /** 전체 목록 사용 여부 */
  flatten: boolean;
  /** 썸네일 사용 여부 */
  thumbnail: boolean;
  /** 썸네일 가로 크기 */
  thumbWidth: number;
  /** 썸네일 세로 크기 */
  thumbHeight: number;
  /** 그룹 */
  group: ArticleGroupDto[];
}
