import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Request } from 'express';
import { FindAndCountOptions, Op, Order, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Bcrypt } from 'src/providers/bcrypt/bcrypt';

import { AdminDto } from 'src/modules/admin/dto/admin.dto';
import { Admin } from 'src/modules/admin/entity/admin.entity';
import { AdminRepository } from 'src/modules/admin/repository/admin.repository';
import {
  AdminAdminParam,
  AdminAuthAdminParam,
  AdminPasswordAdminParam,
  AdminProfileAdminParam,
  AdminSearchAdminParam,
  AdminUsernameAdminParam,
  ResetPasswordAdminParam,
} from 'src/modules/admin/web/admin/admin.admin.param';

import { PaginateUtils } from 'src/utils/paginate.utils';
import { StringUtils } from 'src/utils/string.utils';

@Injectable({ scope: Scope.REQUEST })
export class AdminAdminService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    @InjectMapper() private mapper: Mapper,
    private sequelize: Sequelize,
    private adminRepository: AdminRepository,
  ) {}

  /* Admin */
  async auth(param: AdminAuthAdminParam) {
    const admin = await this.adminRepository.findOne({
      where: { username: param.username },
    });

    if (!admin) {
      throw new BadRequestException('아이디 또는 비밀번호를 확인해주세요.');
    }

    const matched = await Bcrypt.compare(param.password, admin.password);

    if (!matched) {
      throw new BadRequestException('아이디 또는 비밀번호를 확인해주세요.');
    }

    if (admin.status === 'disable') {
      throw new BadRequestException('이용이 제한된 계정입니다.');
    }

    await this.adminRepository.update(admin.id, {
      loginAt: new Date(),
    });

    return this.mapper.map(admin, Admin, AdminDto);
  }

  async session(id: number) {
    const admin = await this.adminRepository.findOne({ where: { id } });

    await this.adminRepository.update(admin.id, {
      loginAt: new Date(),
    });

    return this.mapper.map(admin, Admin, AdminDto);
  }

  async profile(param: AdminProfileAdminParam) {
    const id = this.req.session.admin.id;

    await this.adminRepository.update(id, param);
  }

  async password(param: AdminPasswordAdminParam) {
    const { oldPassword, newPassword, confirmPassword } = param;

    const id = this.req.session.admin.id;

    const admin = await this.adminRepository.findOne({ where: { id } });

    const match = await Bcrypt.compare(oldPassword, admin.password);

    if (!match) {
      throw new BadRequestException('현재 비밀번호가 일치하지 않습니다.');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('새 비밀번호 확인이 일치하지 않습니다.');
    }

    const password = await Bcrypt.encrypt(newPassword);

    await this.adminRepository.update(admin.id, { password });
  }

  async search(param: AdminSearchAdminParam) {
    const [limit, offset] = PaginateUtils.buildQuery(param.page, param.limit);

    const options: FindAndCountOptions<Admin> = {};
    options.limit = limit;
    options.offset = offset;
    options.subQuery = false;
    options.distinct = true;

    // relation
    options.include = [];

    const where: WhereOptions<Admin>[] = [];
    const order: Order = [];

    // search
    if (param.searchQuery && param.searchType) {
      const orWhere: any[] = [];

      orWhere.push({
        [param.searchType]: { [Op.like]: `%${param.searchQuery}%` },
      });

      where.push({
        [Op.or]: orWhere,
      });
    }

    // status
    if (param.status) {
      where.push({
        status: param.status,
      });
    }

    // role
    if (param.role) {
      where.push({
        role: param.role,
      });
    }

    options.where = {
      [Op.and]: where,
    };

    // sort
    if (param.sortColumn) {
      order.push([param.sortColumn, param.sortType]);
    }

    options.order = order;

    const { rows: items, count } = await this.adminRepository.findAndCountAll({
      ...options,
    });

    const meta = PaginateUtils.buildMetadata(
      param.page,
      param.limit,
      items.length,
      count,
    );

    return {
      meta,
      items: items.map((item) => this.mapper.map(item, Admin, AdminDto)),
    };
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });

    return this.mapper.map(admin, Admin, AdminDto);
  }

  async create(param: AdminAdminParam) {
    const exist = await this.adminRepository.findOne({
      where: { username: param.username },
    });

    if (exist) {
      throw new BadRequestException('이미 등록된 아이디 입니다.');
    }

    const password = await Bcrypt.encrypt(param.password);

    const admin = await this.adminRepository.create({ ...param, password });

    return this.mapper.map(admin, Admin, AdminDto);
  }

  async update(id: number, param: AdminAdminParam) {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });

    if (!admin) {
      throw new BadRequestException('잘못된 접근입니다.');
    }

    await this.adminRepository.update(id, param);

    return this.mapper.map(admin, Admin, AdminDto);
  }

  async username(param: AdminUsernameAdminParam) {
    const admin = await this.adminRepository.findOne({
      where: { username: param.username },
    });

    return this.mapper.map(admin, Admin, AdminDto);
  }

  async resetPassword(param: ResetPasswordAdminParam) {
    const admin = await this.adminRepository.findOne({
      where: { id: param.id },
    });

    if (!admin) {
      throw new BadRequestException('잘못된 접근입니다.');
    }

    const temporal = StringUtils.generateTemporal(8);
    const password = await Bcrypt.encrypt(temporal);

    await this.adminRepository.update(admin.id, {
      password,
    });

    return { id: admin.id, temporal };
  }
}
