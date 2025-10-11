import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import dayjs from 'dayjs';
import { Request, Response } from 'express';

import { ArticleBoardDto } from 'src/modules/article/dto/article.board.dto';
import { ArticleDto } from 'src/modules/article/dto/article.dto';
import {
  ArticleListClientDto,
  ArticleSurroundClientDto,
} from 'src/modules/article/web/client/article.client.dto';
import {
  ArticleFlattenClientParam,
  ArticleHitClientParam,
  ArticleLatestClientParam,
  ArticleSearchClientParam,
} from 'src/modules/article/web/client/article.client.param';
import { ArticleClientService } from 'src/modules/article/web/client/article.client.service';

@ApiTags('article')
@Controller('client/article')
export class ArticleClientController {
  constructor(private readonly articleClientService: ArticleClientService) {}

  @ApiOperation({
    summary: '첨부파일 다운로드',
  })
  @ApiOkResponse({ description: '성공' })
  @Get('download/:id')
  async download(@Param('id') id: string, @Res() res: Response) {
    const filestream = await this.articleClientService.download(id, res);
    filestream.pipe(res);
  }

  @ApiOperation({
    summary: '아티클 게시판 조회',
  })
  @ApiOkResponse({ description: '성공', type: ArticleBoardDto })
  @Get('board/:namekey')
  async findOneBoard(@Param('namekey') namekey: string) {
    return await this.articleClientService.findOneBoard(namekey);
  }

  @ApiOperation({
    summary: '관리형 게시글 주변글',
  })
  @ApiOkResponse({ description: '성공', type: ArticleSurroundClientDto })
  @Get('surround/:id')
  async surround(@Param('id') id: number) {
    return await this.articleClientService.surround(id);
  }

  @ApiOperation({
    summary: '아티클 조회수',
  })
  @ApiOkResponse({ description: '성공' })
  @Post('hit')
  async hit(
    @Body() param: ArticleHitClientParam,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const key = `${process.env.APP_NAME.replace('-server', '')}.article_view`;

    const hit = ((req.cookies[key] && JSON.parse(req.cookies[key])) ||
      []) as number[];

    if (hit.includes(param.id)) return;

    await this.articleClientService.hit(param);
    const expires = dayjs().endOf('day').toDate();
    const ids = [...hit, param.id];

    res.cookie(key, JSON.stringify(ids), {
      expires,
      httpOnly: true,
    });
  }

  @ApiOperation({
    summary: '아티클 검색 목록',
  })
  @ApiOkResponse({ description: '성공', type: ArticleListClientDto })
  @Get('search')
  async search(@Query() param: ArticleSearchClientParam) {
    return await this.articleClientService.search(param);
  }

  @ApiOperation({
    summary: '아티클 최신글 조회',
  })
  @ApiOkResponse({ description: '성공', isArray: true, type: ArticleDto })
  @Get('latest')
  async latest(@Query() param: ArticleLatestClientParam) {
    return await this.articleClientService.latest(param);
  }

  @ApiOperation({
    summary: '아티클 전체 조회',
  })
  @ApiOkResponse({ description: '성공', isArray: true, type: ArticleDto })
  @Get('flatten')
  async flatten(@Query() param: ArticleFlattenClientParam) {
    return await this.articleClientService.flatten(param);
  }

  @ApiOperation({
    summary: '아티클 조회',
  })
  @ApiOkResponse({ description: '성공', type: ArticleDto })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.articleClientService.findOne(id);
  }
}
