export interface UserVerifyEmailClientDto {
  /** 상태 */
  status: string;
  /** 재시도 횟수 */
  retry: number;
}
