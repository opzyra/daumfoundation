import { ApiProperty, PartialType } from '@nestjs/swagger';

import { PaginateListDto } from 'src/common/dto/paginate.dto';

import { AdminDto } from 'src/modules/admin/dto/admin.dto';

export class AdminListAdminDto extends PartialType(PaginateListDto) {
  @ApiProperty({ description: '관리자 목록', isArray: true, type: AdminDto })
  items: Array<AdminDto>;
}

export class ResetPasswordAdminDto {
  @ApiProperty({ description: '관리자 PK' })
  id: number;

  @ApiProperty({ description: '임시 비밀번호' })
  temporal: string;
}
