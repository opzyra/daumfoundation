import type { AdminDto } from './adminDto';
import type { TermCategoryDto } from './termCategoryDto';

export interface TermDto {
  /** PK */
  id: number;
  /** 내용 */
  content: string;
  /** 비밀글 설정 */
  secret: boolean;
  /** 작성자 이름 */
  author: string;
  /** 작성자 아이디 */
  username: string;
  /** 분류 PK */
  categoryKey: string;
  /** 분류 */
  category: TermCategoryDto;
  /** 작성자 PK */
  adminId: string;
  /** 작성자 */
  admin: AdminDto;
  /** 시행일시 */
  activeAt?: string;
  /** 등록일시 */
  createdAt?: string;
}
