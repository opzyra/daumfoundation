import { Module } from '@nestjs/common';
import { SequelizeModule as SequelizeModulePackage } from '@nestjs/sequelize';

import chalk from 'chalk';
import SequelizeLogColor from 'sequelize-log-syntax-colors';
import { prettify } from 'sql-log-prettifier';

@Module({
  imports: [
    SequelizeModulePackage.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      timezone: '+09:00',
      autoLoadModels: true,
      logging:
        process.env.NODE_ENV !== 'production'
          ? (sql, meta: any) => {
              const raw = sql.replace(/Executing \(.*\): /, '');
              if (raw === 'SELECT 1+1 AS result') return;
              console.log(
                SequelizeLogColor(
                  prettify(raw, { format: true, noColors: true }),
                ),
                chalk.gray(`-- Tx : [${meta.transaction?.id || 'default'}]`),
              );
            }
          : false,
      synchronize: false,
    }),
  ],
})
export class SequelizeModule {}
