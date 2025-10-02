import { ApiProperty } from '@nestjs/swagger';

import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import {
  ContentValue,
  ResourceValue,
} from 'src/common/decorator/transform.decorator';

import { AdminDto } from 'src/modules/admin/dto/admin.dto';
import { ArticleBoardDto } from 'src/modules/article/dto/article.board.dto';
import { ArticleGroupDto } from 'src/modules/article/dto/article.group.dto';
import { ArticleUploadDto } from 'src/modules/article/dto/article.upload.dto';

export class ArticleDto {
  @AutoMap()
  @ApiProperty({ description: 'PK' })
  id: number;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({ description: '제목' })
  subject: string;

  @AutoMap()
  @ResourceValue()
  @ApiProperty({ description: '썸네일', required: false })
  thumbnail: string;

  @AutoMap()
  @IsNotEmpty()
  @ContentValue()
  @ApiProperty({ description: '내용' })
  content: string;

  @AutoMap()
  @ApiProperty({ description: '조회수', default: false })
  hit: number;

  @AutoMap()
  @ApiProperty({ description: '공지글 설정', default: false })
  notice: boolean;

  @AutoMap()
  @ApiProperty({ description: '비밀글 설정', default: false })
  secret: boolean;

  @AutoMap()
  @ApiProperty({ description: '작성자 이름' })
  author: string;

  @AutoMap()
  @ApiProperty({ description: '작성자 아이디' })
  username: string;

  @AutoMap()
  @ApiProperty({ description: '게시판 PK' })
  boardKey: string;

  @AutoMap(() => ArticleBoardDto)
  @Type(() => ArticleBoardDto)
  @ApiProperty({ description: '게시판' })
  board: ArticleBoardDto;

  @AutoMap()
  @ApiProperty({ description: '그룹 PK' })
  groupKey: string;

  @AutoMap(() => ArticleGroupDto)
  @Type(() => ArticleGroupDto)
  @ApiProperty({ description: '그룹' })
  group: ArticleGroupDto;

  @AutoMap()
  @ApiProperty({ description: '작성자 PK' })
  adminId: string;

  @AutoMap(() => AdminDto)
  @Type(() => AdminDto)
  @ApiProperty({ description: '작성자' })
  admin: AdminDto;

  @AutoMap(() => [ArticleUploadDto])
  @Type(() => ArticleUploadDto)
  @ApiProperty({
    description: '첨부파일',
    required: false,
    isArray: true,
    type: ArticleUploadDto,
  })
  upload?: ArticleUploadDto[];

  @AutoMap()
  @ApiProperty({ description: '등록일시', required: false })
  createdAt: Date;
}
