import { MiddlewareConsumer, Module } from '@nestjs/common';

import { Sequelize } from 'sequelize-typescript';

import { DotenvModule } from 'src/providers/dotenv/dotenv.module';

import { AutomapperModule } from 'src/providers/automapper/automapper.module';
import { CacheModule } from 'src/providers/cache/cache.module';
import { JwtModule } from 'src/providers/jwt/jwt.module';
import { SequelizeModule } from 'src/providers/sequelize/sequelize.module';
import { WinstonModule } from 'src/providers/winston/winston.module';

import { ExceptionFilter } from 'src/common/filter/ExceptionFilter';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { SessionMiddleware } from 'src/common/middleware/session.middleware';

import { AdminModule } from 'src/modules/admin/admin.module';
import { ArticleModule } from 'src/modules/article/article.module';
import { ResourceModule } from 'src/modules/resource/resource.module';

@Module({
  imports: [
    DotenvModule,
    SequelizeModule,
    AutomapperModule,
    WinstonModule,
    JwtModule,
    CacheModule,

    AdminModule,
    ResourceModule,
    ArticleModule,
  ],
  providers: [ExceptionFilter],
})
export class AppModule {
  constructor(private sequelize: Sequelize) {}

  async configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(SessionMiddleware).forRoutes('*');

    if (process.env.NODE_ENV === 'production') {
      await this.sequelize.authenticate();
    }

    if (process.env.NODE_ENV !== 'production') {
      // await this.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true });
      // syncOptions = { force: true };
      await this.sequelize.sync({ alter: true, logging: false });
    }
  }
}
