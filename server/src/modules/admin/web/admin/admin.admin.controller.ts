import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Request, Response } from 'express';
import parseDuration from 'parse-duration';

import { sessionDomain } from 'src/providers/session/file.session';

import { AuthDto } from 'src/common/decorator/auth.decorator';
import { AdminGuard } from 'src/common/guard/admin.guard';

import {
  AdminListAdminDto,
  ResetPasswordAdminDto,
} from 'src/modules/admin/web/admin/admin.admin.dto';
import {
  AdminAdminParam,
  AdminAuthAdminParam,
  AdminPasswordAdminParam,
  AdminProfileAdminParam,
  AdminSearchAdminParam,
  AdminUsernameAdminParam,
  ResetPasswordAdminParam,
} from 'src/modules/admin/web/admin/admin.admin.param';

import { AdminDto } from '../../dto/admin.dto';
import { AdminAdminService } from './admin.admin.service';

@ApiTags('admin')
@Controller('admin/admin')
export class AdminAdminController {
  constructor(
    private jwtService: JwtService,
    private readonly adminAdminService: AdminAdminService,
  ) {}

  /* Admin */
  @ApiOperation({
    summary: '관리자 세션 연장',
  })
  @ApiOkResponse({ description: '성공' })
  @Get('connect')
  async connect(@Req() req: Request) {
    req.session.resetMaxAge();
    req.session.touch();
    req.session.save();
  }

  @ApiOperation({
    summary: '관리자 세션 정보 취득',
  })
  @ApiOkResponse({ description: '성공', type: AdminDto })
  @Get('session')
  async session(@AuthDto('admin') admin: AdminDto) {
    if (!admin) return;
    return await this.adminAdminService.session(admin.id);
  }

  @ApiOperation({
    summary: '관리자 계정 프로필 수정',
  })
  @ApiBody({ type: AdminProfileAdminParam })
  @ApiOkResponse({ description: '성공' })
  @AdminGuard()
  @Post('profile')
  async profile(@Body() param: AdminProfileAdminParam) {
    await this.adminAdminService.profile(param);
  }

  @ApiOperation({
    summary: '관리자 계정 비밀번호 수정',
  })
  @AdminGuard()
  @ApiOkResponse({ description: '성공', type: AdminDto })
  @Post('password')
  async password(@Body() param: AdminPasswordAdminParam, @Req() req: Request) {
    await this.adminAdminService.password(param);

    const admin = await this.adminAdminService.session(req.session.admin.id);
    req.session.admin = admin;

    return admin;
  }

  @ApiOperation({
    summary: '관리자 계정 비밀번호 초기화',
  })
  @AdminGuard('master')
  @ApiOkResponse({ description: '성공', type: ResetPasswordAdminDto })
  @Post('reset/password')
  async resetPassword(@Body() param: ResetPasswordAdminParam) {
    return await this.adminAdminService.resetPassword(param);
  }

  @ApiOperation({
    summary: '관리자 로그인',
  })
  @ApiOkResponse({ description: '성공', type: AdminDto })
  @Post('auth')
  async auth(
    @Body() param: AdminAuthAdminParam,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const admin = await this.adminAdminService.auth(param);
    req.session.admin = admin;

    const payload = {
      id: admin.id,
      username: admin.username,
      role: 'admin',
    };

    if (param.reconnect) {
      const reconnectToken = this.jwtService.sign(payload, {
        expiresIn: parseDuration(process.env.SESSION_RECONNECT_ADMIN_TIME),
      });

      res.cookie('connect.raid', reconnectToken, {
        httpOnly: true,
        maxAge: parseDuration(process.env.SESSION_RECONNECT_ADMIN_TIME),
        domain: sessionDomain(),
      });
    } else {
      res.cookie('connect.raid', '', {
        maxAge: 0,
        domain: sessionDomain(),
      });
    }

    return admin;
  }

  @ApiOperation({
    summary: '관리자 로그아웃',
  })
  @ApiOkResponse({ description: '성공' })
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.session.admin = undefined;

    res.cookie(process.env.SESSION_NAME, '', {
      maxAge: 0,
      domain: sessionDomain(),
    });

    res.cookie(process.env.SESSION_RECONNECT_ADMIN_NAME, '', {
      maxAge: 0,
      domain: sessionDomain(),
    });
  }

  @ApiOperation({
    summary: '관리자 계정 아이디 중복 체크',
  })
  @ApiOkResponse({ description: '성공', type: AdminDto })
  @AdminGuard('master')
  @Post('username')
  async username(@Body() param: AdminUsernameAdminParam) {
    return await this.adminAdminService.username(param);
  }

  @ApiOperation({
    summary: '관리자 검색 목록',
  })
  @ApiOkResponse({ description: '성공', type: AdminListAdminDto })
  @AdminGuard('master')
  @Get('search')
  async search(@Query() param: AdminSearchAdminParam) {
    return await this.adminAdminService.search(param);
  }

  @ApiOperation({
    summary: '관리자 조회',
  })
  @ApiOkResponse({ description: '성공', type: AdminDto })
  @AdminGuard('master')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.adminAdminService.findOne(id);
  }

  @ApiOperation({
    summary: '관리자 등록',
  })
  @ApiOkResponse({ description: '성공', type: AdminDto })
  @AdminGuard('master')
  @Post()
  async create(@Body() param: AdminAdminParam) {
    return await this.adminAdminService.create(param);
  }

  @ApiOperation({
    summary: '관리자 수정',
  })
  @ApiOkResponse({ description: '성공', type: AdminDto })
  @AdminGuard('master')
  @Patch(':id')
  async update(@Param('id') id: number, @Body() param: AdminAdminParam) {
    return await this.adminAdminService.update(id, param);
  }
}
