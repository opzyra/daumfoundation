export interface UserFindPasswordClientParam {
  /** 이메일 */
  email: string;
  /** 휴대폰 번호 */
  phone: string;
  /** 인증 키 */
  key: string;
  /** 인증 번호 */
  phoneCode: string;
}
