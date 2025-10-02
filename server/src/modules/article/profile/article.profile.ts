import { Injectable } from '@nestjs/common';

import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { ArticleBoardDto } from 'src/modules/article/dto/article.board.dto';
import { ArticleDto } from 'src/modules/article/dto/article.dto';
import { ArticleGroupDto } from 'src/modules/article/dto/article.group.dto';
import { ArticleUploadDto } from 'src/modules/article/dto/article.upload.dto';
import { ArticleBoard } from 'src/modules/article/entity/article.board.entity';
import { Article } from 'src/modules/article/entity/article.entity';
import { ArticleGroup } from 'src/modules/article/entity/article.group.entity';
import { ArticleUpload } from 'src/modules/article/entity/article.upload.entity';

@Injectable()
export class ArticleProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      /* Article */
      createMap(mapper, Article, ArticleDto);
      createMap(mapper, ArticleDto, Article);

      /* Article Board */
      createMap(mapper, ArticleBoard, ArticleBoardDto);
      createMap(mapper, ArticleBoardDto, ArticleBoard);

      /* Article Group */
      createMap(mapper, ArticleGroup, ArticleGroupDto);
      createMap(mapper, ArticleGroupDto, ArticleGroup);

      /* Article Upload */
      createMap(mapper, ArticleUpload, ArticleUploadDto);
      createMap(mapper, ArticleUploadDto, ArticleUpload);
    };
  }
}
