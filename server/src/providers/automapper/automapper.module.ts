import { Module } from '@nestjs/common';

import { classes } from '@automapper/classes';
import { AutomapperModule as AutomapperModulePackage } from '@automapper/nestjs';

@Module({
  imports: [
    AutomapperModulePackage.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class AutomapperModule {}
