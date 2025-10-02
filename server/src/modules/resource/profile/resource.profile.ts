import { Injectable } from '@nestjs/common';

import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { ResourceDto } from 'src/modules/resource/dto/resource.dto';
import { Resource } from 'src/modules/resource/entity/resource.entity';

@Injectable()
export class ResourceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      /* Resource */
      createMap(mapper, Resource, ResourceDto);
      createMap(mapper, ResourceDto, Resource);
    };
  }
}
