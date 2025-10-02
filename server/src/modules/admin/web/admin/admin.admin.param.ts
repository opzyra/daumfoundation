import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional } from 'class-validator';

import { IsInValue, UrlValue } from 'src/common/decorator/transform.decorator';
import { PaginateDto } from 'src/common/dto/paginate.dto';

import { AdminDto } from 'src/modules/admin/dto/admin.dto';

export class AdminSearchAdminParam extends PartialType(PaginateDto) {
  @IsOptional()
  @UrlValue()
  @ApiProperty({
    description: '검색어',
    required: false,
  })
  searchQuery?: string;

  @IsOptional()
  @IsInValue(['username', 'name', 'email'])
  @ApiProperty({
    description: '검색 범위',
    required: false,
    type: String,
  })
  searchType?: 'username' | 'name' | 'email';

  @IsOptional()
  @IsInValue(['createdAt', 'loginAt'])
  @ApiProperty({
    description: '정렬 칼럼',
    required: false,
    type: String,
  })
  sortColumn?: 'createdAt' | 'loginAt';

  @IsOptional()
  @IsInValue(['asc', 'desc'])
  @ApiProperty({
    description: '정렬 방식',
    required: false,
    type: String,
  })
  sortType?: 'asc' | 'desc';

  @IsOptional()
  @IsInValue(['master', 'manager', 'aud'])
  @ApiProperty({
    description: '권한',
    required: false,
    type: String,
  })
  role?: 'master' | 'manager' | 'aud';

  @IsOptional()
  @ApiProperty({
    description: '상태',
    required: false,
  })
  status?: string;
}

export class AdminAuthAdminParam {
  @IsNotEmpty()
  @ApiProperty({ description: '아이디' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @IsOptional()
  @ApiProperty({ description: '자동 로그인', required: false })
  reconnect: boolean;
}

export class AdminPasswordAdminParam {
  @IsNotEmpty()
  @ApiProperty({ description: '현재 비밀번호' })
  oldPassword: string;

  @IsNotEmpty()
  @ApiProperty({ description: '새 비밀번호' })
  newPassword: string;

  @IsNotEmpty()
  @ApiProperty({ description: '새 비밀번호 확인' })
  confirmPassword: string;
}

export class ResetPasswordAdminParam {
  @IsNotEmpty()
  @ApiProperty({ description: '관리자 PK' })
  id: number;
}

export class AdminProfileAdminParam extends PickType(PartialType(AdminDto), [
  'name',
  'phone',
  'email',
]) {}

export class AdminAdminParam extends OmitType(PartialType(AdminDto), ['id']) {}

export class AdminUsernameAdminParam {
  @IsNotEmpty()
  @ApiProperty({ description: '아이디' })
  username: string;
}
