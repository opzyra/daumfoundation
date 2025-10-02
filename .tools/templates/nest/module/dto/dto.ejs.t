---
to: <%= h.src() %>/modules/<%= name %>/dto/<%= name %>.dto.ts
Name: <%= Name = h.capitalize(name) %>
---
import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';

export class <%= Name %>Dto {
  @AutoMap()
  @ApiProperty({ description: 'PK' })
  id: number;
}
