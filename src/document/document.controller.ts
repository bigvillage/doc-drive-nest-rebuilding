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

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('list')
  findAll(@Query() query: any) {
    return this.documentService.findAll(query);
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
    @Body() body: any,
    @UploadedFiles() files: any[],
    @Request() req,
  ) {
    // console.log('controller executed');
    // console.log(req.user);

    return this.documentService.upload(body, files, req.user);
  }

  @Put('upload')
  update(@Body() body: any) {
    return this.documentService.update(body);
  }

  @Delete('upload')
  remove(@Body('id') id: string) {
    return this.documentService.delete(id);
  }

  @Patch('upload')
  favorite(@Body() body: any) {
    return this.documentService.favorite(body);
  }
}
