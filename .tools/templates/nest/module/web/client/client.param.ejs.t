---
to: <%= h.src() %>/modules/<%= name %>/web/client/<%= name %>.client.param.ts
Name: <%= Name = h.capitalize(name) %>
---
import { OmitType, PartialType } from '@nestjs/swagger';

import { <%= Name %>Dto } from 'src/modules/<%= name %>/dto/<%= name %>.dto';

export class <%= Name %>ClientParam extends OmitType(PartialType(<%= Name %>Dto), [
  'id',
]) {}
