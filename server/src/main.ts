import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import useragent from 'express-useragent';
import helmet from 'helmet';
import requestIp from 'request-ip';

import fileSession from 'src/providers/session/file.session';
import uaparser from 'src/providers/uaparser/middleware';

import { ExceptionFilter } from 'src/common/filter/ExceptionFilter';

import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: process.env.NODE_ENV === 'production' ? ['error'] : ['debug'],
  });

  const exceptionFilter = app.get(ExceptionFilter);

  app.enableCors({
    origin: [
      ...process.env.URL_ADMIN.split(','),
      ...process.env.URL_CLIENT.split(','),
      process.env.URL_CDN,
    ],
    exposedHeaders: ['Content-disposition', '*'],
    credentials: true,
  });

  app.use(compression());
  app.use(cookieParser());

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );

  app.use(requestIp.mw());
  app.use(useragent.express());
  app.use(uaparser.middleware);

  app.use(fileSession);

  app.use('/resources', express.static('resources'));

  app.useGlobalFilters(exceptionFilter);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseInterceptor(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME)
    .setDescription(`${process.env.APP_NAME} api docs`)
    .setVersion(process.env.npm_package_version)
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory(controllerKey, methodKey) {
      const capitalize = (value: string) =>
        value.charAt(0).toUpperCase() + value.slice(1);

      if (controllerKey.includes('AdminController')) {
        return (
          'admin' +
          capitalize(methodKey) +
          controllerKey.replace('AdminController', '')
        );
      }

      if (controllerKey.includes('ClientController')) {
        return (
          'client' +
          capitalize(methodKey) +
          controllerKey.replace('ClientController', '')
        );
      }

      return methodKey + controllerKey.replace('Controller', '');
    },
  });

  if (process.env.NODE_ENV === 'development') {
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(process.env.APP_PORT, '0.0.0.0');
}

bootstrap()
  .then(() => {
    if (process.send) {
      process.send('ready');
    }
    console.log(`Server is running on port ${process.env.APP_PORT}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Database alter sync`);
    }
    console.log(`VERSION: ${process.env.npm_package_version}`);
    console.log(`APP: ${process.env.APP_NAME}`);
    console.log(`ENV: ${process.env.NODE_ENV}`);
  })
  .catch((error) => {
    console.log(`Unable run`, error.stack);
  });
