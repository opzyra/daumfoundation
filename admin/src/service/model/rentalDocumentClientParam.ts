import type { RentalDocumentClientParamCategory } from './rentalDocumentClientParamCategory';

export interface RentalDocumentClientParam {
  /** 첨부 파일 */
  file: Blob;
  /** 분류 */
  category?: RentalDocumentClientParamCategory;
}
