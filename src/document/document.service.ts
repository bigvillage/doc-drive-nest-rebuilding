import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';

import { Upload, UploadDocument } from './schemas/upload.schema';
// cloudflare
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { NotFoundException } from '@nestjs/common';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';

@Injectable()
export class DocumentService {
  // constructor 안에는 DI(의존성 주입)만
  constructor(
    @InjectModel(Upload.name)
    private readonly uploadModel: Model<UploadDocument>,
  ) {}

  // constructor 밖에는 직접 생성하거나 클래스가 소유하는 멤버
  // 한번만 생성해서 재사용하는 객체
  private readonly s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  // 문서리스트
  async findAll(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter: any = {};

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
          wildcard: {
            title: `*${keyword}*`,
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
}
