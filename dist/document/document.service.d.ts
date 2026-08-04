import { Model } from 'mongoose';
import { Upload, UploadDocument } from './schemas/upload.schema';
export declare class DocumentService {
    private readonly uploadModel;
    constructor(uploadModel: Model<UploadDocument>);
    findAll(query: any): Promise<{
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
}
