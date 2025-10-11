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
import { Request, Response } from 'express';
import fs from 'fs';
import lodash from 'lodash';
import { FindAndCountOptions, Op, Order, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Admin } from 'src/modules/admin/entity/admin.entity';
import { ArticleBoardDto } from 'src/modules/article/dto/article.board.dto';
import { ArticleDto } from 'src/modules/article/dto/article.dto';
import { ArticleBoard } from 'src/modules/article/entity/article.board.entity';
import { Article } from 'src/modules/article/entity/article.entity';
import { ArticleGroup } from 'src/modules/article/entity/article.group.entity';
import { ArticleUpload } from 'src/modules/article/entity/article.upload.entity';
import { ArticleBoardRepository } from 'src/modules/article/repository/article.board.repository';
import { ArticleRepository } from 'src/modules/article/repository/article.repository';
import { ArticleUploadRepository } from 'src/modules/article/repository/article.upload.repository';
import {
  ArticleFlattenClientParam,
  ArticleHitClientParam,
  ArticleLatestClientParam,
  ArticleSearchClientParam,
} from 'src/modules/article/web/client/article.client.param';

import { PaginateUtils } from 'src/utils/paginate.utils';

@Injectable({ scope: Scope.REQUEST })
export class ArticleClientService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    @InjectMapper() private mapper: Mapper,
    private sequelize: Sequelize,
    private articleRepository: ArticleRepository,
    private articleBoardRepository: ArticleBoardRepository,
    private articleUploadRepository: ArticleUploadRepository,
  ) {}

  async download(id: string, res: Response) {
    const upload = await this.articleUploadRepository.findOne({
      where: { id },
    });
    if (!upload) {
      throw new NotFoundException('파일을 찾을수 없습니다.');
    }

    const path = upload.path.replace(/\.\.\/|/gi, '');

    const existsFile = fs.existsSync('./' + path);
    if (!existsFile) {
      throw new NotFoundException('파일을 찾을수 없습니다.');
    }

    const filestream = fs.createReadStream('./' + path);

    res.setHeader(
      'Content-disposition',
      'attachment; filename="' +
        encodeURI(upload.originalname) +
        '.' +
        upload.extension +
        '"',
    );
    res.setHeader('Content-type', upload.mimetype);

    return filestream;
  }

  async findOneBoard(namekey: string) {
    const board = await this.articleBoardRepository.findOne({
      where: { namekey },
      include: [{ model: ArticleGroup, as: 'group' }],
      order: [[{ model: ArticleGroup, as: 'group' }, 'priority', 'ASC']],
    });

    if (!board) {
      throw new NotFoundException('존재하지 않는 리소스입니다.');
    }

    return this.mapper.map(board, ArticleBoard, ArticleBoardDto);
  }

  /* Article */
  async search(param: ArticleSearchClientParam) {
    const [limit, offset] = PaginateUtils.buildQuery(param.page, param.limit);

    const options: FindAndCountOptions<Article> = {};
    options.limit = limit;
    options.offset = offset;
    options.subQuery = false;
    options.distinct = true;

    // relation
    options.include = [
      {
        model: ArticleBoard,
        as: 'board',
        include: [
          { model: ArticleGroup, as: 'group', attributes: ['namekey'] },
        ],
        attributes: ['namekey'],
      },
      { model: ArticleGroup, attributes: ['name'] },
      {
        model: ArticleUpload,
        attributes: ['id'],
      },
      {
        model: Admin,
        attributes: ['id', 'username', 'name'],
      },
    ];

    const where: WhereOptions<Article>[] = [
      {
        secret: false,
      },
    ];

    const order: Order = [
      ['notice', 'desc'],
      ['createdAt', 'desc'],
    ];

    // search
    // query
    if (!lodash.isEmpty(param.query)) {
      const orWhere: any[] = [];

      if (!param.locale) {
        orWhere.push({
          ['subject']: { [Op.like]: `%${param.query}%` },
        });

        orWhere.push({
          ['content']: { [Op.like]: `%${param.query}%` },
        });
      }

      if (param.locale === 'en') {
        orWhere.push({
          ['subjectEn']: { [Op.like]: `%${param.query}%` },
        });

        orWhere.push({
          ['contentEn']: { [Op.like]: `%${param.query}%` },
        });
      }

      if (param.locale === 'es') {
        orWhere.push({
          ['subjectEs']: { [Op.like]: `%${param.query}%` },
        });

        orWhere.push({
          ['contentEs']: { [Op.like]: `%${param.query}%` },
        });
      }

      if (param.locale === 'jp') {
        orWhere.push({
          ['subjectJp']: { [Op.like]: `%${param.query}%` },
        });

        orWhere.push({
          ['contentJp']: { [Op.like]: `%${param.query}%` },
        });
      }

      where.push({
        [Op.or]: orWhere,
      });
    }

    // board
    if (!lodash.isEmpty(param.board)) {
      where.push({
        ['$board.namekey$']: param.board,
      });
    }

    options.where = {
      [Op.and]: where,
    };

    options.order = order;

    const { rows: items, count } = await this.articleRepository.findAndCountAll(
      {
        ...options,
      },
    );

    const meta = PaginateUtils.buildMetadata(
      param.page,
      param.limit,
      items.length,
      count,
    );

    return {
      meta,
      items: items.map((item) => this.mapper.map(item, Article, ArticleDto)),
    };
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id, secret: false },
      include: [
        ArticleBoard,
        ArticleGroup,
        ArticleUpload,
        {
          model: Admin,
          required: false,
          attributes: ['id', 'username', 'name'],
        },
      ],
    });

    if (lodash.isEmpty(article)) {
      throw new NotFoundException('존재하지 않는 리소스입니다.');
    }

    return this.mapper.map(article, Article, ArticleDto);
  }

  async hit(param: ArticleHitClientParam) {
    await this.articleRepository.update(param.id, {
      hit: Sequelize.literal('hit + 1'),
    });
  }

  async flatten(param: ArticleFlattenClientParam) {
    const board = await this.articleBoardRepository.findOne({
      where: { namekey: param.board },
    });

    if (!board || !board.flatten) {
      throw new BadRequestException('잘못된 접근입니다.');
    }

    const options: FindAndCountOptions<Article> = {};
    const where: WhereOptions<Article>[] = [];
    options.include = [
      {
        model: ArticleBoard,
        as: 'board',
        include: [
          { model: ArticleGroup, as: 'group', attributes: ['namekey'] },
        ],
        attributes: ['namekey'],
      },
      { model: ArticleGroup, attributes: ['name'] },
      {
        model: ArticleUpload,
        attributes: ['id'],
      },
      {
        model: Admin,
        attributes: ['id', 'username', 'name'],
      },
    ];

    // secret
    where.push({
      secret: false,
    });

    // board
    if (param.board) {
      where.push({
        boardKey: param.board,
      });
    }

    // group
    if (param.group) {
      where.push({
        groupKey: param.group,
      });
    }

    options.where = {
      [Op.and]: where,
    };

    const order: Order = [];
    order.push(['notice', 'desc']);
    order.push(['createdAt', 'desc']);

    options.order = order;

    const items = await this.articleRepository.findAll(options);

    return items.map((item) => this.mapper.map(item, Article, ArticleDto));
  }

  async latest(param: ArticleLatestClientParam) {
    const board = await this.articleBoardRepository.findOne({
      where: { namekey: param.board },
    });

    if (!board || !board.latest) {
      throw new BadRequestException('잘못된 접근입니다.');
    }

    const options: FindAndCountOptions<Article> = {};
    const where: WhereOptions<Article>[] = [];

    options.limit = param.limit || 20;

    options.include = [
      {
        model: ArticleBoard,
        as: 'board',
        include: [
          { model: ArticleGroup, as: 'group', attributes: ['namekey'] },
        ],
        attributes: ['namekey'],
      },
      { model: ArticleGroup, attributes: ['name'] },
      {
        model: ArticleUpload,
        attributes: ['id'],
      },
      {
        model: Admin,
        attributes: ['id', 'username', 'name'],
      },
    ];

    // secret
    where.push({
      secret: false,
    });

    // board
    if (param.board) {
      where.push({
        boardKey: param.board,
      });
    }

    // group
    if (param.group) {
      where.push({
        groupKey: param.group,
      });
    }

    options.where = {
      [Op.and]: where,
    };

    const order: Order = [];
    order.push(['notice', 'desc']);
    order.push(['createdAt', 'desc']);

    options.order = order;

    const items = await this.articleRepository.findAll(options);

    return items.map((item) => this.mapper.map(item, Article, ArticleDto));
  }

  async surround(id: number) {
    const item = await this.articleRepository.findOne({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('존재하지 않는 리소스입니다.');
    }

    const [queryResult] = await this.sequelize.query(
      `
      (SELECT 'prev' as direction, created_at as createdAt, tb_article.* FROM tb_article WHERE created_at < :createdAt AND secret = false AND board_key = :boardKey ${
        item.group ? 'AND group_key = :groupKey' : ''
      } ORDER BY created_at DESC LIMIT 1)
      UNION ALL
      (SELECT 'next' as direction, created_at as createdAt, tb_article.* FROM tb_article WHERE created_at > :createdAt AND secret = false AND board_key = :boardKey ${
        item.group ? 'AND group_key = :groupKey' : ''
      } ORDER BY created_at ASC LIMIT 1)
    `,
      {
        replacements: {
          createdAt: item.createdAt,
          boardKey: item.boardKey,
          groupKey: item.groupKey,
        },
      },
    );

    return lodash
      .chain(queryResult)
      .groupBy((row: any) => (row.direction === 'prev' ? 'prev' : 'next'))
      .mapValues((value) => lodash.head(value))
      .value();
  }
}
