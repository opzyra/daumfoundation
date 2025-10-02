import type { ProductCategoryAdminParamParent } from './productCategoryAdminParamParent';
import type { ProductDto } from './productDto';

export interface ProductCategoryAdminParam {
  /** 이름 */
  name?: string;
  /** 이미지 */
  image?: string;
  /** 우선 순위 */
  priority?: number;
  /**
   * 상위 카테고리 PK
   * @nullable
   */
  parentId?: number | null;
  /**
   * 상위 카테고리
   * @nullable
   */
  parent?: ProductCategoryAdminParamParent;
  /** 연결된 상품 목록 */
  product?: ProductDto[];
}
