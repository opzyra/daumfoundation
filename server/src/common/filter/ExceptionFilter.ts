import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  Inject,
  Logger,
  ExceptionFilter as NestExceptionFilter,
} from '@nestjs/common';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import requestIp from 'request-ip';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  private readonly logger = new Logger('Exception');

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly winston: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { method, originalUrl } = request;

    const admin = request.session.admin;
    const user = request.session.user;

    const username = admin?.username
      ? admin.username
      : user?.username
        ? user.username
        : 'anonymous';

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    let error = (exception as Error).message;
    const stack = (exception as Error).stack;

    if (exception instanceof BadRequestException) {
      error = (exception.getResponse() as any).message;
    }

    const message = `${originalUrl},${method},${status},${username},${
      request?.clientIp || requestIp.getClientIp(request)
    },${String(error).replace(',', '')}`;

    if (process.env.NODE_ENV === 'development') {
      this.logger.error(message, stack);
    }

    this.winston.error(message, stack);

    response.status(status).json({
      status,
      message: status === 500 ? '시스템 오류가 발생했습니다.' : error,
    });
  }
}
