---
to: <%= h.src() %>/modules/<%= name %>/web/client/<%= name %>.client.controller.ts
Name: <%= Name = h.capitalize(name) %>
---
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserGuard } from 'src/common/guard/user.guard';

import { <%= Name %>ClientService } from 'src/modules/<%= name %>/web/client/<%= name %>.client.service';

@ApiTags('<%= name %>')
@UserGuard()
@Controller('client/<%= name %>')
export class <%= Name %>ClientController {
  constructor(private readonly <%= name %>ClientService: <%= Name %>ClientService) {}
}
