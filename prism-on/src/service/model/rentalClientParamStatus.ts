/**
 * 상태
 */
export type RentalClientParamStatus =
  (typeof RentalClientParamStatus)[keyof typeof RentalClientParamStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RentalClientParamStatus = {
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
