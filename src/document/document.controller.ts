import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Res,
  Request,
  Query,
  UploadedFiles,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import type { Response } from 'express';
import { Readable } from 'node:stream';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// dto
import { UploadDocumentDto } from './dto/upload-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FavoriteDocumentDto } from './dto/favorite-document.dto';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @UseGuards(JwtAuthGuard)
  @Get('list')
  findAll(@Query() query: any, @Request() req) {
    return this.documentService.findAll(query, req.user);
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
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async upload(
    @Body() body: UploadDocumentDto,
    @UploadedFiles() files: any[],
    @Request() req,
  ) {
    // console.log('controller executed');
    // console.log(req.user);

    return this.documentService.upload(body, files, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('upload')
  update(@Body() body: UpdateDocumentDto, @Request() req) {
    return this.documentService.update(body, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('upload')
  remove(@Body('id') id: string, @Request() req) {
    return this.documentService.delete(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('upload')
  favorite(@Body() body: FavoriteDocumentDto, @Request() req) {
    return this.documentService.favorite(body, req.user);
  }
}
