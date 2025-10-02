export interface AdminAuthAdminParam {
  /** 아이디 */
  username: string;
  /** 비밀번호 */
  password: string;
  /** 자동 로그인 */
  reconnect?: boolean;
}
