import {
  Controller,
  Get,
  Res,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import type { Response } from 'express';
import { Readable } from 'node:stream';

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
}
