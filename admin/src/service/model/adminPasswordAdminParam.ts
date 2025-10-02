export interface AdminPasswordAdminParam {
  /** 현재 비밀번호 */
  oldPassword: string;
  /** 새 비밀번호 */
  newPassword: string;
  /** 새 비밀번호 확인 */
  confirmPassword: string;
}
