import { DocumentService } from './document.service';
import type { Response } from 'express';
export declare class DocumentController {
    private readonly documentService;
    constructor(documentService: DocumentService);
    findAll(query: any): Promise<{
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
}
