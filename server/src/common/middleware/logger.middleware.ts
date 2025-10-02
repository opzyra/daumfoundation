import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import requestIp from 'request-ip';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly winston: Logger,
  ) {}

  private logger = new Logger('Http');

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    const { method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    const admin = request.session.admin;
    const user = request.session.user;

    const username = admin?.username
      ? admin.username
      : user?.username
        ? user.username
        : 'anonymous';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('Content-Length');
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      const message = `${originalUrl},${method},${statusCode},${responseTime.toFixed(
        2,
      )}ms,${contentLength},${username},${
        request?.clientIp || requestIp.getClientIp(request)
      },${userAgent}`;

      if (!userAgent.includes('ELB-HealthChecker')) {
        this.logger.log(message);
        this.winston.log(message);
      }
    });

    return next();
  }
}
