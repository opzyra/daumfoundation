import { Module } from '@nestjs/common';
import { SequelizeModule as SequelizeModulePackage } from '@nestjs/sequelize';

import { ArticleBoard } from 'src/modules/article/entity/article.board.entity';
import { Article } from 'src/modules/article/entity/article.entity';
import { ArticleGroup } from 'src/modules/article/entity/article.group.entity';
import { ArticleUpload } from 'src/modules/article/entity/article.upload.entity';
import { ArticleProfile } from 'src/modules/article/profile/article.profile';
import { ArticleBoardRepository } from 'src/modules/article/repository/article.board.repository';
import { ArticleGroupRepository } from 'src/modules/article/repository/article.group.repository';
import { ArticleRepository } from 'src/modules/article/repository/article.repository';
import { ArticleUploadRepository } from 'src/modules/article/repository/article.upload.repository';
import { ArticleAdminController } from 'src/modules/article/web/admin/article.admin.controller';
import { ArticleAdminService } from 'src/modules/article/web/admin/article.admin.service';
import { ArticleClientController } from 'src/modules/article/web/client/article.client.controller';
import { ArticleClientService } from 'src/modules/article/web/client/article.client.service';

const Models = [Article, ArticleBoard, ArticleGroup, ArticleUpload];
const Repositories = [
  ArticleRepository,
  ArticleBoardRepository,
  ArticleGroupRepository,
  ArticleUploadRepository,
];
const Controllers = [ArticleAdminController, ArticleClientController];
const Services = [ArticleAdminService, ArticleClientService];

@Module({
  imports: [SequelizeModulePackage.forFeature(Models)],
  controllers: [...Controllers],
  providers: [ArticleProfile, ...Services, ...Repositories],
  exports: [...Services, ...Repositories],
})
export class ArticleModule {}
