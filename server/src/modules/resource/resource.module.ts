import { Global, Module } from '@nestjs/common';
import { SequelizeModule as SequelizeModulePackage } from '@nestjs/sequelize';

import { Resource } from 'src/modules/resource/entity/resource.entity';
import { ResourceProfile } from 'src/modules/resource/profile/resource.profile';
import { ResourceRepository } from 'src/modules/resource/repository/resource.repository';

const Models = [Resource];
const Repositories = [ResourceRepository];

@Global()
@Module({
  imports: [SequelizeModulePackage.forFeature(Models)],
  controllers: [],
  providers: [ResourceProfile, ...Repositories],
  exports: [...Repositories],
})
export class ResourceModule {}
