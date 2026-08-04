import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';

import { Upload, UploadDocument } from './schemas/upload.schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Upload.name)
    private readonly uploadModel: Model<UploadDocument>,
  ) {}

  //   문서리스트
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

  //   검색
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
}
