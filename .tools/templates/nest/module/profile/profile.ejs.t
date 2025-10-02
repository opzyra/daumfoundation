---
to: <%= h.src() %>/modules/<%= name %>/profile/<%= name %>.profile.ts
Name: <%= Name = h.capitalize(name) %>
---
import { Injectable } from '@nestjs/common';

import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { <%= Name %>Dto } from 'src/modules/<%= name %>/dto/<%= name %>.dto';
import { <%= Name %> } from 'src/modules/<%= name %>/entity/<%= name %>.entity';

@Injectable()
export class <%= Name %>Profile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      /* <%= Name %> */
      createMap(mapper, <%= Name %>, <%= Name %>Dto);
      createMap(mapper, <%= Name %>Dto, <%= Name %>);
    };
  }
}
