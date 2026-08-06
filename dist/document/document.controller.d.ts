import { DocumentService } from './document.service';
import type { Response } from 'express';
import type { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { UploadDocumentDto } from './dto/upload-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FavoriteDocumentDto } from './dto/favorite-document.dto';
import { ListDocumentDto } from './dto/list-document.dto';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    findAll(query: ListDocumentDto, user: JwtUser): Promise<{
        documents: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/upload.schema").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/upload.schema").Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/upload.schema").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/upload.schema").Upload & {
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
    search(q: string): Promise<any>;
    download(fileUrl: string, originalName: string, res: Response): Promise<void>;
    upload(body: UploadDocumentDto, files: any[], user: JwtUser): Promise<{
        result: boolean;
        document: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/upload.schema").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/upload.schema").Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/upload.schema").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/upload.schema").Upload & {
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
        document: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/upload.schema").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/upload.schema").Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/upload.schema").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/upload.schema").Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    remove(id: string, user: JwtUser): Promise<{
        result: boolean;
        message: string;
    }>;
    favorite(body: FavoriteDocumentDto, user: JwtUser): Promise<{
        result: boolean;
        document: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/upload.schema").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/upload.schema").Upload & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/upload.schema").Upload, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/upload.schema").Upload & {
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
