/**
 * 상태
 */
export type RentalDtoStatus =
  (typeof RentalDtoStatus)[keyof typeof RentalDtoStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RentalDtoStatus = {
  submit: 'submit',
  pending: 'pending',
  hold: 'hold',
  supplement: 'supplement',
  approve: 'approve',
  signature: 'signature',
  payment: 'payment',
  deposit: 'deposit',
  dispatch: 'dispatch',
  receive: 'receive',
  rental: 'rental',
  retrieve: 'retrieve',
  redispatch: 'redispatch',
  rerental: 'rerental',
  handover: 'handover',
  terminate: 'terminate',
  cancel: 'cancel',
} as const;
