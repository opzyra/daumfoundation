/**
 * 분류
 */
export type RentalDocumentClientParamCategory =
  (typeof RentalDocumentClientParamCategory)[keyof typeof RentalDocumentClientParamCategory];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RentalDocumentClientParamCategory = {
  welfareCard: 'welfareCard',
  residentCard: 'residentCard',
  hearingTest: 'hearingTest',
  familyCertificate: 'familyCertificate',
  vulnerableProof: 'vulnerableProof',
  unrepairableCertificate: 'unrepairableCertificate',
  lossReport: 'lossReport',
} as const;
