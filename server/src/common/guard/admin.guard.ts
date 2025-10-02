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
import { Observable } from 'rxjs';

type RoleType = 'master' | 'admin';

const HasRoles = (...roles: Array<RoleType>) => SetMetadata('roles', roles);

export const AdminGuard = (...roles: Array<RoleType>) => {
  return applyDecorators(
    HasRoles(...roles),
    UseGuards(AdminRoleGuard),
    ApiBasicAuth(),
  );
};

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const admin = request.session?.admin;

    const params =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];

    const roles = ['master', 'admin', ...params];

    if (!admin) return false;

    if (params && params[0] === 'master') {
      return admin.role === 'master';
    }

    return roles.includes(admin.role);
  }
}
