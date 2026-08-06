import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { Upload, UploadDocument } from './schemas/upload.schema';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';
// dto
import { UploadDocumentDto } from './dto/upload-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FavoriteDocumentDto } from './dto/favorite-document.dto';
import { ListDocumentDto } from './dto/list-document.dto';
// cloudflare
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { NotFoundException } from '@nestjs/common';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
// config
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DocumentService {
  private readonly s3Client: S3Client;
  // constructor 안에는 DI(의존성 주입)만
  constructor(
    @InjectModel(Upload.name)
    private readonly uploadModel: Model<UploadDocument>,
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: this.configService.get<string>('R2_ENDPOINT'),
      credentials: {
        accessKeyId: this.configService.get<string>('R2_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>(
          'R2_SECRET_ACCESS_KEY',
        )!,
      },
    });
  }

  // constructor 밖에는 직접 생성하거나 클래스가 소유하는 멤버
  // 한번만 생성해서 재사용하는 객체
  //   private readonly s3Client = new S3Client({
  //     region: 'auto',
  //     endpoint: process.env.R2_ENDPOINT,
  //     credentials: {
  //       accessKeyId: process.env.R2_ACCESS_KEY_ID!,
  //       secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  //     },
  //   });

  // 문서리스트
  async findAll(query: ListDocumentDto, user: JwtUser) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const skip = (page - 1) * limit;

    const filter: any = {
      userId: user.id,
    };

    if (query.isFavorite === 'true' || query.type === 'favorite') {
      filter.isFavorite = true;
    }

    const total = await this.uploadModel.countDocuments(filter);

    const documents = await this.uploadModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return {
      documents,
      total,
    };
  }

  // 검색
  async search(keyword: string) {
    if (!keyword) {
      throw new BadRequestException('검색어를 입력해주세요.');
    }

    const response = await axios.post(
      `${process.env.ES_URL}/documents/_search`,
      {
        query: {
          match: {
            title: keyword,
          },
        },
      },
      {
        auth: {
          username: 'elastic',
          password: process.env.ES_PASSWORD || '123!@#qwe',
        },
      },
    );

    const hits = response.data.hits.hits;

    return hits.map((hit) => ({
      _id: hit._id,
      ...hit._source,
    }));
  }

  // 파일 다운로드
  async download(fileUrl: string): Promise<GetObjectCommandOutput> {
    const fileKey = fileUrl.split('/').pop()?.split('?')[0];

    if (!fileKey) {
      throw new NotFoundException('파일 Key를 찾을 수 없습니다.');
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileKey,
    });

    return await this.s3Client.send(command);
  }

  // 파일등록
  async upload(body: UploadDocumentDto, files: any[], user: JwtUser) {
    const uploadedFiles: {
      fileKey: string;
      originalName: string;
      size: number;
      fileUrl: string;
    }[] = [];

    for (const file of files) {
      // 한글 파일명 깨짐 방지
      const utf8Name = Buffer.from(file.originalname, 'latin1').toString(
        'utf8',
      );

      // R2에 저장될 파일명
      const fileKey = `${Date.now()}_${utf8Name}`;

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      uploadedFiles.push({
        fileKey,
        originalName: utf8Name,
        size: file.size,
        fileUrl: `${process.env.R2_PUBLIC_URL}/${fileKey}`,
      });
    }

    const document = await this.uploadModel.create({
      title: body.title,
      content: body.content,
      tags: typeof body.tags === 'string' ? JSON.parse(body.tags) : body.tags,
      userId: user.id,
      files: uploadedFiles,
    });

    await axios.post(
      `${process.env.ES_URL}/documents/_doc/${document._id}`,
      {
        title: document.title,
        content: document.content,
        files: document.files.map((file) => ({
          originalName: file.originalName,
          fileUrl: file.fileUrl,
        })),
      },
      {
        auth: {
          username: 'elastic',
          password: process.env.ES_PASSWORD || '123!@#qwe',
        },
      },
    );

    return {
      result: true,
      document,
    };
  }

  // 파일 수정
  async update(body: UpdateDocumentDto, user: JwtUser) {
    const { id, title, content, tags } = body;

    const document = await this.uploadModel.findOne({
      _id: id,
      userId: user.id,
    });

    if (!document) {
      throw new NotFoundException('문서를 찾을 수 없습니다.');
    }

    document.title = title || document.title;
    document.content = content || document.content;

    if (tags) {
      document.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }

    await document.save();

    // Elasticsearch 업데이트
    await axios.post(
      `${process.env.ES_URL}/documents/_update/${id}`,
      {
        doc: {
          title: document.title,
          content: document.content,
        },
      },
      {
        auth: {
          username: 'elastic',
          password: process.env.ES_PASSWORD || '123!@#qwe',
        },
      },
    );

    return {
      result: true,
      document,
    };
  }

  // 파일 삭제
  async delete(id: string, user: JwtUser) {
    const document = await this.uploadModel.findOne({
      _id: id,
      userId: user.id,
    });

    if (!document) {
      throw new NotFoundException('문서를 찾을 수 없습니다.');
    }

    // R2 파일 삭제
    for (const file of document.files) {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: file.fileKey,
        }),
      );
    }

    // MongoDB 삭제
    await document.deleteOne();

    // Elasticsearch 삭제
    await axios.delete(`${process.env.ES_URL}/documents/_doc/${id}`, {
      auth: {
        username: 'elastic',
        password: process.env.ES_PASSWORD || '123!@#qwe',
      },
    });

    return {
      result: true,
      message: '삭제 성공',
    };
  }

  // 즐겨찾기
  async favorite(body: FavoriteDocumentDto, user: JwtUser) {
    const { id, isFavorite } = body;

    const document = await this.uploadModel.findOne({
      _id: id,
      userId: user.id,
    });

    if (!document) {
      throw new NotFoundException('문서를 찾을 수 없습니다.');
    }

    document.isFavorite = isFavorite;
    await document.save();

    await axios.post(
      `${process.env.ES_URL}/documents/_update/${id}`,
      {
        doc: {
          isFavorite: document.isFavorite,
        },
      },
      {
        auth: {
          username: 'elastic',
          password: process.env.ES_PASSWORD || '123!@#qwe',
        },
      },
    );

    return {
      result: true,
      document,
    };
  }
}
