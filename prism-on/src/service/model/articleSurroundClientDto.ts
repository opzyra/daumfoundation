import type { ArticleDto } from './articleDto';

export interface ArticleSurroundClientDto {
  /** 이전 게시글 */
  prev: ArticleDto;
  /** 다음 게시글 */
  next: ArticleDto;
}
