export interface ResourceDto {
  /** PK */
  id: number;
  /** 모듈 */
  module: string;
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
  /** 등록 일시 */
  createdAt: string;
}
