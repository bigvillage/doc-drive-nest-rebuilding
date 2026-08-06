import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Res,
  Query,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
// swagger
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { DocumentService } from './document.service';
import type { Response } from 'express';
import { Readable } from 'node:stream';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
// dto
import { UploadDocumentDto } from './dto/upload-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FavoriteDocumentDto } from './dto/favorite-document.dto';
import { ListDocumentDto } from './dto/list-document.dto';

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '문서 목록 조회' })
  @ApiCookieAuth('token')
  @Get('list')
  findAll(@Query() query: ListDocumentDto, @CurrentUser() user: JwtUser) {
    return this.documentService.findAll(query, user);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.documentService.search(q);
  }

  @Get('download')
  async download(
    @Query('url') fileUrl: string,
    @Query('name') originalName: string,
    @Res() res: Response,
  ) {
    const response = await this.documentService.download(fileUrl);
    const body = response.Body;

    if (!(body instanceof Readable)) {
      throw new InternalServerErrorException('파일을 읽을 수 없습니다.');
    }

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(originalName)}`,
    );

    res.setHeader(
      'Content-Type',
      response.ContentType || 'application/octet-stream',
    );

    body.pipe(res);
  }

  @UseGuards(JwtAuthGuard) //JWT 인증 연결
  @ApiOperation({ summary: '문서 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiCookieAuth('token')
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
      },

      fileFilter(req, file, callback) {
        const allowExt =
          /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|hwp|hwpx|txt|png|jpg|jpeg|gif)$/i;

        if (!allowExt.test(file.originalname)) {
          return callback(
            new BadRequestException('허용되지 않는 파일 형식입니다.'),
            false,
          );
        }

        callback(null, true);
      },
    }),
  )
  async upload(
    @Body() body: UploadDocumentDto,
    @UploadedFiles() files: any[],
    @CurrentUser() user: JwtUser,
  ) {
    // console.log('controller executed');
    // console.log(req.user);

    return this.documentService.upload(body, files, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '문서 수정' })
  @ApiCookieAuth('token')
  @Put('upload')
  update(@Body() body: UpdateDocumentDto, @CurrentUser() user: JwtUser) {
    return this.documentService.update(body, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '문서 삭제' })
  @ApiCookieAuth('token')
  @Delete('upload')
  remove(@Body('id') id: string, @CurrentUser() user: JwtUser) {
    return this.documentService.delete(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '즐겨찾기 변경' })
  @ApiCookieAuth('token')
  @Patch('upload')
  favorite(@Body() body: FavoriteDocumentDto, @CurrentUser() user: JwtUser) {
    return this.documentService.favorite(body, user);
  }
}
