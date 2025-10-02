export interface UserAdminParam {
  /** 아이디 */
  username?: string;
  /** 비밀번호 */
  password?: string;
  /** 이름 */
  name?: string;
  /** 연락처 */
  phone?: string;
  /** 연락처 뒷자리 */
  phoneMask?: string;
  /** 권한 */
  role?: string;
  /** 메모 */
  memo?: string;
  /** 카카오 로그인 ID */
  oauthKakaoId?: string;
  /** 카카오 로그인 이메일 */
  oauthKakaoEmail?: string;
  /** 카카오 연결 일시 */
  oauthKakaoAt?: string;
  /** 계정 상태 */
  status?: string;
  /** 홍보 및 마케팅 동의 */
  marketing?: boolean;
  /** 최근 로그인 일시 */
  loginAt?: string;
  /** 홍보 및 마케팅 동의 일시 */
  marketingAt?: string;
  /** 탈퇴 사유 */
  disableReason?: string;
  /** 탈퇴 사유 */
  withdrawReason?: string;
  /** 휴대폰 인증 일시 */
  phoneAt?: string;
  /** 이메일 인증 일시 */
  emailAt?: string;
  /** 정지 일시 */
  disableAt?: string;
  /** 탈퇴 일시 */
  withdrawAt?: string;
  /** 등록 일시 */
  createdAt?: string;
}
