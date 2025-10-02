---
to: <%= h.src() %>/modules/<%= name %>/web/admin/<%= name %>.admin.dto.ts
Name: <%= Name = h.capitalize(name) %>
---
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { PaginateListDto } from 'src/common/dto/paginate.dto';

import { <%= Name %>Dto } from 'src/modules/<%= name %>/dto/<%= name %>.dto';

export class <%= Name %>ListAdminDto extends PartialType(PaginateListDto) {
  @ApiProperty({
    description: '<%= domain %> 목록',
    isArray: true,
    type: <%= Name %>Dto,
  })
  items: Array<<%= Name %>Dto>;
}
