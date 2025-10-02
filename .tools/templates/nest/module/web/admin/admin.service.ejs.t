---
to: <%= h.src() %>/modules/<%= name %>/web/admin/<%= name %>.admin.service.ts
Name: <%= Name = h.capitalize(name) %>
---
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import lodash from 'lodash';
import { FindAndCountOptions, FindOptions, Op, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Order, WhereOptions } from 'sequelize/types/model';

import {
  <%= Name %>AdminParam,
  <%= Name %>RemoveAdminParam,
  <%= Name %>SearchAdminParam,
} from 'src/modules/<%= name %>/web/admin/<%= name %>.admin.param';

import { Transactional } from 'src/common/decorator/transaction.decorator';

import { <%= Name %>Dto } from 'src/modules/<%= name %>/dto/<%= name %>.dto';
import { <%= Name %> } from 'src/modules/<%= name %>/entity/<%= name %>.entity';
import { <%= Name %>Repository } from 'src/modules/<%= name %>/repository/<%= name %>.repository';

import { PaginateUtils } from 'src/utils/paginate.utils';

@Injectable({ scope: Scope.REQUEST })
export class <%= Name %>AdminService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    @InjectMapper() private mapper: Mapper,
    private sequelize: Sequelize,
    private <%= name %>Repository: <%= Name %>Repository,
  ) {}

  async search(param: <%= Name %>SearchAdminParam) {
    const [limit, offset] = PaginateUtils.buildQuery(param.page, param.limit);

    const options: FindAndCountOptions<<%= Name %>> = {};
    options.limit = limit;
    options.offset = offset;
    options.distinct = true;

    // relation
    options.include = [];

    const where: WhereOptions<<%= Name %>>[] = [];
    let order: Order = [];

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

    options.where = {
      [Op.and]: where,
    };

    // sort
    if (param.sortColumn) {
      order.push([param.sortColumn, param.sortType]);
    }

    options.order = order;

    const { rows: items, count } = await this.<%= name %>Repository.findAndCountAll({
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
      items: items.map((item) => this.mapper.map(item, <%= Name %>, <%= Name %>Dto)),
    };
  }

  async findAll() {
    const items = await this.<%= name %>Repository.findAll({
      include: [],
    });

    return items.map((item)=>this.mapper.map(item, <%= Name %>, <%= Name %>Dto));
  }

  async findOne(id: number) {
    const <%= name %> = await this.<%= name %>Repository.findOne({
      where: { id },
      include: [],
    });

    if (lodash.isEmpty(<%= name %>)) {
      throw new NotFoundException('존재하지 않는 리소스입니다.');
    }

    return this.mapper.map(<%= name %>, <%= Name %>, <%= Name %>Dto);
  }

  async create(param: <%= Name %>AdminParam) {
    const <%= name %> = await this.<%= name %>Repository.create(
      { ...param },
    );

    return this.mapper.map(<%= name %>, <%= Name %>, <%= Name %>Dto);
  }

  async update(
    id: number,
    param: <%= Name %>AdminParam,
  ) {
    const <%= name %> = await this.<%= name %>Repository.findOne({
      where: { id },
    });

    if (lodash.isEmpty(<%= name %>)) {
      throw new BadRequestException('잘못된 접근입니다.');
    }

    await this.<%= name %>Repository.update(id, param);
  }

  async delete(id: number) {
    const <%= name %> = await this.<%= name %>Repository.findOne({
      where: { id },
    });

    if (lodash.isEmpty(<%= name %>)) {
      throw new BadRequestException('잘못된 접근입니다.');
    }

    await this.<%= name %>Repository.delete(id);
  }

  @Transactional()
  async remove(param: <%= Name %>RemoveAdminParam, transaction?: Transaction) {
    const ids = param.ids;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      await this.<%= name %>Repository.delete(id, transaction);
    }
  }
}
