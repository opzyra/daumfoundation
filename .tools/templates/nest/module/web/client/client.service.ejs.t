---
to: <%= h.src() %>/modules/<%= name %>/web/client/<%= name %>.client.service.ts
Name: <%= Name = h.capitalize(name) %>
---
import { Injectable } from '@nestjs/common';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Sequelize } from 'sequelize-typescript';

import { <%= Name %>Repository } from 'src/modules/<%= name %>/repository/<%= name %>.repository';

@Injectable()
export class <%= Name %>ClientService {
  constructor(
    @InjectMapper() private mapper: Mapper,
    private sequelize: Sequelize,
    private <%= name %>Repository: <%= Name %>Repository,
  ) {}
}
