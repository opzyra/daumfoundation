import type { ProductCategoryDto } from './productCategoryDto';
import type { ProductDtoStatus } from './productDtoStatus';
import type { ProductForm } from './productForm';
import type { ProductMetadata } from './productMetadata';

export interface ProductDto {
  /** PK */
  id: number;
  /** 상태 */
  status: ProductDtoStatus;
  /** 브랜드 */
  brand: string;
  /** 제품명 */
  name: string;
  /** 이미지 */
  image: string;
  /** 대여 가능 기간 */
  period: number;
  /** 검색 키워드 */
  keyword: string[];
  /** 메타 데이터 */
  metadata?: ProductMetadata[];
  /** 입력 항목 */
  form?: ProductForm[];
  /** 상세 내용 */
  content?: string;
  /** 카테고리 PK */
  categoryId: number;
  /** 카테고리 */
  category: ProductCategoryDto;
  /** 라벨 PK */
  labelIds: number[];
  /** 라벨 카테고리 목록 */
  label: ProductCategoryDto[];
  /** 등록 일시 */
  createdAt?: string;
}
