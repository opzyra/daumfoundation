import { Injectable } from '@nestjs/common';

import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { AdminDto } from 'src/modules/admin/dto/admin.dto';
import { Admin } from 'src/modules/admin/entity/admin.entity';

@Injectable()
export class AdminProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, Admin, AdminDto);
      createMap(mapper, AdminDto, Admin);
    };
  }
}
