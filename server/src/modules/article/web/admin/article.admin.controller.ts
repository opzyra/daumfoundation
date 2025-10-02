import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Response } from 'express';

import { AdminGuard } from 'src/common/guard/admin.guard';
import { ResourceInterceptor } from 'src/common/interceptor/resource.interceptor';
import { UploadInterceptor } from 'src/common/interceptor/upload.interceptor';

import { ArticleBoardDto } from 'src/modules/article/dto/article.board.dto';
import { ArticleDto } from 'src/modules/article/dto/article.dto';
import { ArticleUploadDto } from 'src/modules/article/dto/article.upload.dto';
import { ArticleListAdminDto } from 'src/modules/article/web/admin/article.admin.dto';
import {
  ArticleAdminParam,
  ArticleRemoveAdminParam,
  ArticleSearchAdminParam,
  ArticleUploadAdminParam,
} from 'src/modules/article/web/admin/article.admin.param';
import { ArticleAdminService } from 'src/modules/article/web/admin/article.admin.service';
import { ResourceDto } from 'src/modules/resource/dto/resource.dto';
import { ResourceParam } from 'src/modules/resource/param/resource.param';

@ApiTags('article')
@AdminGuard()
@Controller('admin/article')
export class ArticleAdminController {
  constructor(private readonly articleAdminService: ArticleAdminService) {}

  /* ArticleUpload */
  @ApiOperation({
    summary: '첨부파일 업로드',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ArticleUploadAdminParam })
  @ApiOkResponse({ description: '성공', type: ArticleUploadDto })
  @UploadInterceptor('article')
  @Post('upload')
  async upload(@UploadedFile() file: MulterFile) {
    return await this.articleAdminService.upload(file);
  }

  @ApiOperation({
    summary: '첨부파일 다운로드',
  })
  @ApiOkResponse({ description: '성공' })
  @Get('download/:id')
  async download(@Param('id') id: string, @Res() res: Response) {
    const filestream = await this.articleAdminService.download(id, res);
    filestream.pipe(res);
  }

  /* ArticleBoard */
  @ApiOperation({
    summary: '관리형 게시판 전체 조회',
  })
  @ApiOkResponse({ description: '성공', isArray: true, type: ArticleBoardDto })
  @Get('board')
  async findAllBoard() {
    return await this.articleAdminService.findAllBoard();
  }

  @ApiOperation({
    summary: '아티클 게시판 조회',
  })
  @ApiOkResponse({ description: '성공', type: ArticleBoardDto })
  @Get('board/:namekey')
  async findOneBoard(@Param('namekey') namekey: string) {
    return await this.articleAdminService.findOneBoard(namekey);
  }

  /* Article */
  @ApiOperation({
    summary: '이미지 업로드',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ResourceParam })
  @ApiOkResponse({ description: '성공', type: ResourceDto })
  @ResourceInterceptor('article')
  @Post('resource')
  async resource(@UploadedFile() file: MulterFile) {
    return await this.articleAdminService.resource(file);
  }

  @ApiOperation({
    summary: '썸네일 업로드',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: ResourceParam })
  @ApiOkResponse({ description: '성공', type: ResourceDto })
  @ResourceInterceptor('article')
  @Post('thumbnail')
  async thumbnail(@UploadedFile() file: MulterFile) {
    return await this.articleAdminService.thumbnail(file);
  }

  @ApiOperation({
    summary: '아티클 검색 목록',
  })
  @ApiOkResponse({ description: '성공', type: ArticleListAdminDto })
  @Get('search')
  async search(@Query() param: ArticleSearchAdminParam) {
    return await this.articleAdminService.search(param);
  }

  @ApiOperation({
    summary: '아티클 조회',
  })
  @ApiOkResponse({ description: '성공', type: ArticleDto })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.articleAdminService.findOne(id);
  }

  @ApiOperation({
    summary: '아티클 등록',
  })
  @ApiOkResponse({ description: '성공', type: ArticleDto })
  @Post()
  async create(@Body() param: ArticleAdminParam) {
    return await this.articleAdminService.create(param);
  }

  @ApiOperation({
    summary: '아티클 수정',
  })
  @ApiOkResponse({ description: '성공' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() param: ArticleAdminParam) {
    return await this.articleAdminService.update(id, param);
  }

  @ApiOperation({
    summary: '아티클 삭제',
  })
  @ApiOkResponse({ description: '성공' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.articleAdminService.delete(id);
  }

  @ApiOperation({
    summary: '아티클 일괄 삭제',
  })
  @ApiOkResponse({ description: '성공' })
  @Post('remove')
  async remove(@Body() param: ArticleRemoveAdminParam) {
    return await this.articleAdminService.remove(param);
  }
}
