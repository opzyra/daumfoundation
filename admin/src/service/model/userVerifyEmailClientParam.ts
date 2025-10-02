export interface UserVerifyEmailClientParam {
  /** 인증 KEY */
  key: string;
  /** 이메일 */
  email: string;
  /** 코드값 */
  code: string;
}
