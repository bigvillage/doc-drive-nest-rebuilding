import { Model } from 'mongoose';
import { Upload, UploadDocument } from './schemas/upload.schema';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FavoriteDocumentDto } from './dto/favorite-document.dto';
import { ListDocumentDto } from './dto/list-document.dto';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
export declare class DocumentService {
    private readonly uploadModel;
    private readonly configService;
    private readonly s3Client;
    private readonly esUrl;
    private readonly esPassword;
    constructor(uploadModel: Model<UploadDocument>, configService: ConfigService);
    findAll(query: ListDocumentDto, user: JwtUser): Promise<{
        documents: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Upload, {}, import("mongoose").DefaultSchemaOptions> & Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Upload, {}, import("mongoose").DefaultSchemaOptions> & Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
    }>;
    search(keyword: string): Promise<any>;
    download(fileUrl: string): Promise<GetObjectCommandOutput>;
    upload(body: UploadDocumentDto, files: any[], user: JwtUser): Promise<{
        result: boolean;
        document: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Upload, {}, import("mongoose").DefaultSchemaOptions> & Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Upload, {}, import("mongoose").DefaultSchemaOptions> & Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    update(body: UpdateDocumentDto, user: JwtUser): Promise<{
        result: boolean;
        document: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Upload, {}, import("mongoose").DefaultSchemaOptions> & Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Upload, {}, import("mongoose").DefaultSchemaOptions> & Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    delete(id: string, user: JwtUser): Promise<{
        result: boolean;
        message: string;
    }>;
    favorite(body: FavoriteDocumentDto, user: JwtUser): Promise<{
        result: boolean;
        document: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Upload, {}, import("mongoose").DefaultSchemaOptions> & Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Upload, {}, import("mongoose").DefaultSchemaOptions> & Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
}
