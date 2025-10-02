export interface UserSignEmailClientParam {
  /** 이름 */
  name: string;
  /** 아이디 */
  username: string;
  /** 비밀번호 */
  password: string;
  /** 연락처 */
  phone: string;
  /** 홍보 및 마케팅 동의 */
  agreeMarketing: boolean;
}
