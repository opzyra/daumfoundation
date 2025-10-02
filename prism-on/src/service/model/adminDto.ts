export interface AdminDto {
  /** PK */
  id: number;
  /** 아이디 */
  username: string;
  /** 비밀번호 */
  password: string;
  /** 이름 */
  name: string;
  /** 연락처 */
  phone?: string;
  /** 이메일 */
  email?: string;
  /** 권한 */
  role: string;
  /** 계정 상태 */
  status?: string;
  /** 메모 */
  memo?: string;
  /** 최근 로그인일시 */
  loginAt?: string;
  /** 등록일시 */
  createdAt?: string;
}
