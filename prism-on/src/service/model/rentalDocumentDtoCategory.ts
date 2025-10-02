/**
 * 분류
 */
export type RentalDocumentDtoCategory =
  (typeof RentalDocumentDtoCategory)[keyof typeof RentalDocumentDtoCategory];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RentalDocumentDtoCategory = {
  welfareCard: 'welfareCard',
  residentCard: 'residentCard',
  hearingTest: 'hearingTest',
  familyCertificate: 'familyCertificate',
  vulnerableProof: 'vulnerableProof',
  unrepairableCertificate: 'unrepairableCertificate',
  lossReport: 'lossReport',
} as const;
