import { CacheModule as CacheModulePackage } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [CacheModulePackage.register({ isGlobal: true })],
})
export class CacheModule {}
