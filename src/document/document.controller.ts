import { Controller, Get, Query } from '@nestjs/common';
import { DocumentService } from './document.service';

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
}
