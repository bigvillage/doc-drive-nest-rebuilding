import { Model } from 'mongoose';
import { Upload, UploadDocument } from './schemas/upload.schema';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FavoriteDocumentDto } from './dto/favorite-document.dto';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';
export declare class DocumentService {
    private readonly uploadModel;
    constructor(uploadModel: Model<UploadDocument>);
    private readonly s3Client;
    findAll(query: any, user: any): Promise<{
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
    upload(body: UploadDocumentDto, files: any[], user: any): Promise<{
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
    update(body: UpdateDocumentDto, user: any): Promise<{
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
    delete(id: string, user: any): Promise<{
        result: boolean;
        message: string;
    }>;
    favorite(body: FavoriteDocumentDto, user: any): Promise<{
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
