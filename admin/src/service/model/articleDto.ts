import type { AdminDto } from './adminDto';
import type { ArticleBoardDto } from './articleBoardDto';
import type { ArticleGroupDto } from './articleGroupDto';
import type { ArticleUploadDto } from './articleUploadDto';

export interface ArticleDto {
  /** PK */
  id: number;
  /** 제목 */
  subject: string;
  /** 썸네일 */
  thumbnail?: string;
  /** 내용 */
  content: string;
  /** 조회수 */
  hit: number;
  /** 공지글 설정 */
  notice: boolean;
  /** 비밀글 설정 */
  secret: boolean;
  /** 작성자 이름 */
  author: string;
  /** 작성자 아이디 */
  username: string;
  /** 게시판 PK */
  boardKey: string;
  /** 게시판 */
  board: ArticleBoardDto;
  /** 그룹 PK */
  groupKey: string;
  /** 그룹 */
  group: ArticleGroupDto;
  /** 작성자 PK */
  adminId: string;
  /** 작성자 */
  admin: AdminDto;
  /** 첨부파일 */
  upload?: ArticleUploadDto[];
  /** 등록일시 */
  createdAt?: string;
}
