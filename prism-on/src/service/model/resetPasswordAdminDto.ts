export interface ResetPasswordAdminDto {
  /** 관리자 PK */
  id: number;
  /** 임시 비밀번호 */
  temporal: string;
}
