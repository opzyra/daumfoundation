import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const AuthDto = createParamDecorator(
  (data: 'admin' | 'user', ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (data === 'admin') {
      const admin = request.session.admin;
      if (admin && admin.password) delete admin.password;
      return admin;
    }

    if (data === 'user') {
      const user = request.session.user;
      if (user && user.password) delete user.password;
      return user;
    }

    return null;
  },
);
