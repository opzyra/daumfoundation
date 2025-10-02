/**
 * 상태
 */
export type ProductDtoStatus =
  (typeof ProductDtoStatus)[keyof typeof ProductDtoStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProductDtoStatus = {
  available: 'available',
  disable: 'disable',
  hidden: 'hidden',
} as const;
