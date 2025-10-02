import { Global, Module } from '@nestjs/common';

import { WinstonModule as WinstonModulePackage } from 'nest-winston';

import { options } from 'src/providers/winston/logger.winston';

@Global()
@Module({
  imports: [WinstonModulePackage.forRoot(options)],
})
export class WinstonModule {}
