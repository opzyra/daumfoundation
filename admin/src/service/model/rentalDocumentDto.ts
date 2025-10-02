import type { RentalDocumentDtoCategory } from './rentalDocumentDtoCategory';
import type { UserDto } from './userDto';

export interface RentalDocumentDto {
  /** PK */
  id: number;
  /** 분류 */
  category: RentalDocumentDtoCategory;
  /** 미디어 타입 */
  mimetype: string;
  /** 파일명 */
  originalname: string;
  /** 확장자 */
  extension: string;
  /** 전체 파일명 */
  fullname: string;
  /** 저장 경로 */
  path: string;
  /** 파일 용량 */
  size: number;
  /** 대여 PK */
  rentalId: number;
  /** 회원 PK */
  userId: number;
  /** 회원 */
  user?: UserDto;
  /** 등록 일시 */
  createdAt?: string;
}
