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
import { FindAndCountOptions, Op, Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Order, WhereOptions } from 'sequelize/types/model';

import { Transactional } from 'src/common/decorator/transaction.decorator';

import { Admin } from 'src/modules/admin/entity/admin.entity';
import { ArticleBoardDto } from 'src/modules/article/dto/article.board.dto';
import { ArticleDto } from 'src/modules/article/dto/article.dto';
import { ArticleUploadDto } from 'src/modules/article/dto/article.upload.dto';
import { ArticleBoard } from 'src/modules/article/entity/article.board.entity';
import { Article } from 'src/modules/article/entity/article.entity';
import { ArticleGroup } from 'src/modules/article/entity/article.group.entity';
import { ArticleUpload } from 'src/modules/article/entity/article.upload.entity';
import { ArticleBoardRepository } from 'src/modules/article/repository/article.board.repository';
import { ArticleRepository } from 'src/modules/article/repository/article.repository';
import { ArticleUploadRepository } from 'src/modules/article/repository/article.upload.repository';
import {
  ArticleAdminParam,
  ArticleRemoveAdminParam,
  ArticleSearchAdminParam,
} from 'src/modules/article/web/admin/article.admin.param';
import { ResourceDto } from 'src/modules/resource/dto/resource.dto';
import { Resource } from 'src/modules/resource/entity/resource.entity';
import { ResourceRepository } from 'src/modules/resource/repository/resource.repository';

import { PaginateUtils } from 'src/utils/paginate.utils';
import { StringUtils } from 'src/utils/string.utils';

@Injectable({ scope: Scope.REQUEST })
export class ArticleAdminService {
  constructor(
    @Inject(REQUEST) private readonly req: Request,
    @InjectMapper() private mapper: Mapper,
    private sequelize: Sequelize,
    private articleRepository: ArticleRepository,
    private articleBoardRepository: ArticleBoardRepository,
    private articleUploadRepository: ArticleUploadRepository,
    private resourceRepository: ResourceRepository,
  ) {}

  /* ArticleResource */
  async resource(file: MulterFile) {
    const filename = file.originalname || file.filename;
    const extension = filename
      .substring(filename.lastIndexOf('.') + 1, filename.length)
      .toLowerCase();

    const originalname = filename.substring(0, filename.lastIndexOf('.'));

    const resource = await this.resourceRepository.create({
      ...file,
      module: 'article',
      path: '#{CDN_URL}/' + file.path,
      originalname: originalname.normalize('NFC'),
      extension,
    });

    return this.mapper.map(resource, Resource, ResourceDto);
  }

  /* ArticleUpload */
  async upload(file: MulterFile) {
    const filename = file.originalname || file.filename;
    const extension = filename
      .substring(filename.lastIndexOf('.') + 1, filename.length)
      .toLowerCase();

    const originalname = filename.substring(0, filename.lastIndexOf('.'));

    const resource = await this.articleUploadRepository.create({
      ...file,
      path: file.path || file.key,
      originalname: originalname.normalize('NFC'),
      fullname: originalname.normalize('NFC') + '.' + extension,
      extension,
    });

    return this.mapper.map(resource, ArticleUpload, ArticleUploadDto);
  }

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

  /* ArticleBoard */
  async findAllBoard() {
    const items = await this.articleBoardRepository.findAll({
      order: [['priority', 'ASC']],
    });

    return items.map((item) =>
      this.mapper.map(item, ArticleBoard, ArticleBoardDto),
    );
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
  async search(param: ArticleSearchAdminParam) {
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

    const where: WhereOptions<Article>[] = [];
    const order: Order = [
      ['notice', 'desc'],
      ['createdAt', 'desc'],
    ];

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

    // board
    if (param.board) {
      where.push({
        ['$board.namekey$']: param.board,
      });
    }

    // group
    if (param.group) {
      where.push({
        ['$group.namekey$']: param.group,
      });
    }

    // status
    if (param.status) {
      if (param.status === 'notice') {
        where.push({
          notice: true,
        });
      }

      if (param.status === 'secret') {
        where.push({
          secret: true,
        });
      }
    }

    options.where = {
      [Op.and]: where,
    };

    // sort
    if (param.sortColumn) {
      order.push([param.sortColumn, param.sortType]);
    }

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
      where: { id },
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

  async create(param: ArticleAdminParam, transaction?: Transaction) {
    const admin = this.req.session.admin;

    let thumbnail = param.thumbnail || null;

    if (param.extract) {
      thumbnail = await StringUtils.extractThumbnail(param.content);
    }

    const article = await this.articleRepository.create(
      {
        ...param,
        thumbnail,
        author: admin.name,
        username: admin.username,
      },
      transaction,
    );

    await article.$set(
      'upload',
      !lodash.isEmpty(param.upload)
        ? param.upload.map((upload) => upload.id)
        : [],
      { transaction },
    );

    return this.mapper.map(article, Article, ArticleDto);
  }

  async update(
    id: number,
    param: ArticleAdminParam,
    transaction?: Transaction,
  ) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (lodash.isEmpty(article)) {
      throw new BadRequestException('잘못된 접근입니다.');
    }

    const admin = this.req.session.admin;

    let thumbnail = param.thumbnail || null;

    if (param.extract) {
      thumbnail = await StringUtils.extractThumbnail(param.content);
    }

    await this.articleRepository.update(
      id,
      {
        ...param,
        thumbnail,
        author: admin.name,
        username: admin.username,
      },
      transaction,
    );

    await article.$set(
      'upload',
      !lodash.isEmpty(param.upload)
        ? param.upload.map((upload) => upload.id)
        : [],
      { transaction },
    );
  }

  async delete(id: number) {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (lodash.isEmpty(article)) {
      throw new BadRequestException('잘못된 접근입니다.');
    }

    await this.articleRepository.delete(id);
  }

  @Transactional()
  async remove(param: ArticleRemoveAdminParam, transaction?: Transaction) {
    const ids = param.ids;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      await this.articleRepository.delete(id, transaction);
    }
  }

  async thumbnail(file: MulterFile) {
    const filename = file.originalname || file.filename;
    const extension = filename
      .substring(filename.lastIndexOf('.') + 1, filename.length)
      .toLowerCase();

    const originalname = filename.substring(0, filename.lastIndexOf('.'));

    const resource = await this.resourceRepository.create({
      ...file,
      module: 'article',
      path: '#{CDN_URL}/' + file.path,
      originalname: originalname.normalize('NFC'),
      extension,
    });

    return this.mapper.map(resource, Resource, ResourceDto);
  }
}
