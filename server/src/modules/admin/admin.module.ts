import { Module } from '@nestjs/common';
import { SequelizeModule as SequelizeModulePackage } from '@nestjs/sequelize';

import { Admin } from 'src/modules/admin/entity/admin.entity';
import { AdminProfile } from 'src/modules/admin/profile/admin.profile';
import { AdminRepository } from 'src/modules/admin/repository/admin.repository';
import { AdminAdminController } from 'src/modules/admin/web/admin/admin.admin.controller';
import { AdminAdminService } from 'src/modules/admin/web/admin/admin.admin.service';

const Models = [Admin];
const Repositories = [AdminRepository];
const Controllers = [AdminAdminController];
const Services = [AdminAdminService];

@Module({
  imports: [SequelizeModulePackage.forFeature(Models)],
  controllers: [...Controllers],
  providers: [AdminProfile, ...Services, ...Repositories],
  exports: [...Services, ...Repositories],
})
export class AdminModule {}
