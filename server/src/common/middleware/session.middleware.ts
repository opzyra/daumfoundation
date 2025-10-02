import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { sessionDomain } from 'src/providers/session/file.session';

import { PayloadDto } from 'src/common/dto/payload.dto';

import { AdminDto } from 'src/modules/admin/dto/admin.dto';
import { Admin } from 'src/modules/admin/entity/admin.entity';
import { AdminRepository } from 'src/modules/admin/repository/admin.repository';

import { NumberUtils } from 'src/utils/number.utils';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    @InjectMapper() private mapper: Mapper,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly winston: Logger,
    private readonly jwtService: JwtService,
    private readonly adminRepository: AdminRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const raid = req.cookies[process.env.SESSION_RECONNECT_ADMIN_NAME];
    const rcid = req.cookies[process.env.SESSION_RECONNECT_CLIENT_NAME];

    if (raid) {
      try {
        this.jwtService.verify(raid);
        const payload = this.jwtService.decode(raid) as PayloadDto;

        let admin = req.session.admin;

        if (!admin) {
          const findAdmin = await this.adminRepository.findOne({
            where: { id: payload.id },
          });

          admin = this.mapper.map(findAdmin, Admin, AdminDto);

          req.session.admin = admin;
        }

        const token = this.jwtService.sign(
          {
            id: admin.id,
            username: admin.username,
            role: 'admin',
          },
          {
            secret: process.env.SESSION_SECRET,
            expiresIn: process.env.SESSION_RECONNECT_ADMIN_TIME,
          },
        );

        res.cookie('connect.raid', token, {
          httpOnly: true,
          maxAge: NumberUtils.parseDuration(
            process.env.SESSION_RECONNECT_ADMIN_TIME,
          ),
          domain: sessionDomain(),
        });
      } catch (error) {
        if (error?.name !== 'TokenExpiredError') {
          this.winston.error(error?.stack);
        }
      }
    }

    return next();
  }
}
