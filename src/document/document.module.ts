import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from './schemas/upload.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Upload.name,
        schema: UploadSchema,
      },
    ]),
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
