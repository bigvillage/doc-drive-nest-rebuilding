import { HydratedDocument, Types } from 'mongoose';
export type UploadDocument = HydratedDocument<Upload>;
export declare class Upload {
    title: string;
    content: string;
    tags: string[];
    files: {
        fileKey: string;
        originalName: string;
        size: number;
        fileUrl: string;
    }[];
    isFavorite: boolean;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    isUpdated: boolean;
}
export declare const UploadSchema: import("mongoose").Schema<Upload, import("mongoose").Model<Upload, any, any, any, any, any, Upload>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Upload, import("mongoose").Document<unknown, {}, Upload, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Upload, import("mongoose").Document<unknown, {}, Upload, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, Upload, import("mongoose").Document<unknown, {}, Upload, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string[], Upload, import("mongoose").Document<unknown, {}, Upload, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    files?: import("mongoose").SchemaDefinitionProperty<{
        fileKey: string;
        originalName: string;
        size: number;
        fileUrl: string;
    }[], Upload, import("mongoose").Document<unknown, {}, Upload, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isFavorite?: import("mongoose").SchemaDefinitionProperty<boolean, Upload, import("mongoose").Document<unknown, {}, Upload, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Upload, import("mongoose").Document<unknown, {}, Upload, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date, Upload, import("mongoose").Document<unknown, {}, Upload, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date, Upload, import("mongoose").Document<unknown, {}, Upload, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    isUpdated?: import("mongoose").SchemaDefinitionProperty<boolean, Upload, import("mongoose").Document<unknown, {}, Upload, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Upload & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Upload>;
