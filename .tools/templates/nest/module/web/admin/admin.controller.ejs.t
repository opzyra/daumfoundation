---
to: <%= h.src() %>/modules/<%= name %>/web/admin/<%= name %>.admin.controller.ts
Name: <%= Name = h.capitalize(name) %>
---
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminGuard } from 'src/common/guard/admin.guard';

import { <%= Name %>Dto } from 'src/modules/<%= name %>/dto/<%= name %>.dto';
import { <%= Name %>ListAdminDto } from 'src/modules/<%= name %>/web/admin/<%= name %>.admin.dto';
import {
  <%= Name %>AdminParam,
  <%= Name %>RemoveAdminParam,
  <%= Name %>SearchAdminParam,
} from 'src/modules/<%= name %>/web/admin/<%= name %>.admin.param';
import { <%= Name %>AdminService } from 'src/modules/<%= name %>/web/admin/<%= name %>.admin.service';

@ApiTags('<%= name %>')
@AdminGuard()
@Controller('admin/<%= name %>')
export class <%= Name %>AdminController {
  constructor(private readonly <%= name %>AdminService: <%= Name %>AdminService) {}

  /* <%= Name %> */
  @ApiOperation({
    summary: '<%= domain %> 검색 목록',
  })
  @ApiOkResponse({ description: '성공', type: <%= Name %>ListAdminDto })
  @Get('search')
  async search(@Query() param: <%= Name %>SearchAdminParam) {
    return await this.<%= name %>AdminService.search(param);
  }

  @ApiOperation({
    summary: '<%= domain %> 전체 목록',
  })
  @ApiOkResponse({ description: '성공', isArray: true, type: <%= Name %>Dto })
  @Get()
  async findAll() {
    return await this.<%= name %>AdminService.findAll();
  }

  @ApiOperation({
    summary: '<%= domain %> 조회',
  })
  @ApiOkResponse({ description: '성공', type: <%= Name %>Dto })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.<%= name %>AdminService.findOne(id);
  }

  @ApiOperation({
    summary: '<%= domain %> 등록',
  })
  @ApiOkResponse({ description: '성공', type: <%= Name %>Dto })
  @Post()
  async create(@Body() param: <%= Name %>AdminParam) {
    return await this.<%= name %>AdminService.create(param);
  }

  @ApiOperation({
    summary: '<%= domain %> 수정',
  })
  @ApiOkResponse({ description: '성공' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() param: <%= Name %>AdminParam) {
    return await this.<%= name %>AdminService.update(id, param);
  }

  @ApiOperation({
    summary: '<%= domain %> 삭제',
  })
  @ApiOkResponse({ description: '성공' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.<%= name %>AdminService.delete(id);
  }

  @ApiOperation({
    summary: '<%= domain %> 일괄 삭제',
  })
  @ApiOkResponse({ description: '성공' })
  @Post('remove')
  async remove(@Body() param: <%= Name %>RemoveAdminParam) {
    return await this.<%= name %>AdminService.remove(param);
  }
}
