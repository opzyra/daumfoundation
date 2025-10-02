import dayjs from 'dayjs';
import { WinstonModule as WinstonModulePackage } from 'nest-winston/dist/winston.module';
import winston from 'winston';
import 'winston-daily-rotate-file';

export const options = {
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/access/access-%DATE%.log',
      datePattern: 'YYYYMMDD',
      zippedArchive: false,
      level: 'info',
      format: winston.format.combine(
        winston.format((info) => {
          if (info.level === 'info') return info;
        })(),
        winston.format.printf(
          (info) => `${dayjs().format('YYYY-MM-DD,HH:mm:ss,')}${info.message}`,
        ),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/debug/debug-%DATE%.log',
      datePattern: 'YYYYMMDD',
      zippedArchive: false,
      level: 'debug',
      format: winston.format.combine(
        winston.format((info) => {
          if (info.level === 'debug') return info;
        })(),
        winston.format.printf(
          (info) => `${dayjs().format('YYYY-MM-DD,HH:mm:ss,')}${info.message}`,
        ),
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/error/error-%DATE%.log',
      datePattern: 'YYYYMMDD',
      zippedArchive: false,
      level: 'error',
      format: winston.format.combine(
        winston.format((info) => {
          if (info.level === 'error') return info;
        })(),
        winston.format.printf(
          (info) => `${dayjs().format('YYYY-MM-DD,HH:mm:ss,')}${info.message}`,
        ),
      ),
    }),
  ],
};

const logger = WinstonModulePackage.createLogger(options);

export default logger;
