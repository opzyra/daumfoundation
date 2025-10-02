import { Global, Module } from '@nestjs/common';
import { JwtModule as JwtModulePackage } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModulePackage.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN },
    }),
  ],
  exports: [JwtModulePackage],
})
export class JwtModule {}
