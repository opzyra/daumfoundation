/**
 * 상태
 */
export type ProductAdminParamStatus =
  (typeof ProductAdminParamStatus)[keyof typeof ProductAdminParamStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ProductAdminParamStatus = {
  available: 'available',
  disable: 'disable',
  hidden: 'hidden',
} as const;
