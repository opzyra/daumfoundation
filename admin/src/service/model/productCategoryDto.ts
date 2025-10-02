import type { ProductCategoryDtoParent } from './productCategoryDtoParent';
import type { ProductDto } from './productDto';

export interface ProductCategoryDto {
  /** PK */
  id: number;
  /** 이름 */
  name: string;
  /** 이미지 */
  image: string;
  /** 우선 순위 */
  priority: number;
  /**
   * 상위 카테고리 PK
   * @nullable
   */
  parentId?: number | null;
  /**
   * 상위 카테고리
   * @nullable
   */
  parent?: ProductCategoryDtoParent;
  /** 하위 카테고리 목록 */
  children?: ProductCategoryDto[];
  /** 연결된 상품 목록 */
  product?: ProductDto[];
}
