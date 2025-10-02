import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiBasicAuth } from '@nestjs/swagger';

import { Request } from 'express';
import lodash from 'lodash';
import { Observable } from 'rxjs';

const HasRoles = (...roles: Array<string>) => SetMetadata('roles', roles);

export const UserGuard = (...roles: Array<string>) => {
  if (lodash.isEmpty(roles)) {
    return applyDecorators(UseGuards(UserRoleGuard), ApiBasicAuth());
  }

  return applyDecorators(
    UseGuards(UserRoleGuard),
    HasRoles(...roles),
    ApiBasicAuth(),
  );
};

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.session?.user;
    if (user && !roles) {
      return true;
    }

    if (user && roles) {
      return roles.includes(user.role);
    }

    return false;
  }
}
