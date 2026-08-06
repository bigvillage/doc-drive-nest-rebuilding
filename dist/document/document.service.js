"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = __importDefault(require("axios"));
const mongoose_2 = require("mongoose");
const upload_schema_1 = require("./schemas/upload.schema");
const client_s3_1 = require("@aws-sdk/client-s3");
const common_2 = require("@nestjs/common");
const client_s3_2 = require("@aws-sdk/client-s3");
let DocumentService = class DocumentService {
    uploadModel;
    constructor(uploadModel) {
        this.uploadModel = uploadModel;
    }
    s3Client = new client_s3_1.S3Client({
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
    });
    async findAll(query, user) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;
        const filter = {
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
    async search(keyword) {
        if (!keyword) {
            throw new common_1.BadRequestException('검색어를 입력해주세요.');
        }
        const response = await axios_1.default.post(`${process.env.ES_URL}/documents/_search`, {
            query: {
                match: {
                    title: keyword,
                },
            },
        }, {
            auth: {
                username: 'elastic',
                password: process.env.ES_PASSWORD || '123!@#qwe',
            },
        });
        const hits = response.data.hits.hits;
        return hits.map((hit) => ({
            _id: hit._id,
            ...hit._source,
        }));
    }
    async download(fileUrl) {
        const fileKey = fileUrl.split('/').pop()?.split('?')[0];
        if (!fileKey) {
            throw new common_2.NotFoundException('파일 Key를 찾을 수 없습니다.');
        }
        const command = new client_s3_1.GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileKey,
        });
        return await this.s3Client.send(command);
    }
    async upload(body, files, user) {
        const uploadedFiles = [];
        for (const file of files) {
            const utf8Name = Buffer.from(file.originalname, 'latin1').toString('utf8');
            const fileKey = `${Date.now()}_${utf8Name}`;
            await this.s3Client.send(new client_s3_2.PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: fileKey,
                Body: file.buffer,
                ContentType: file.mimetype,
            }));
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
        await axios_1.default.post(`${process.env.ES_URL}/documents/_doc/${document._id}`, {
            title: document.title,
            content: document.content,
            files: document.files.map((file) => ({
                originalName: file.originalName,
                fileUrl: file.fileUrl,
            })),
        }, {
            auth: {
                username: 'elastic',
                password: process.env.ES_PASSWORD || '123!@#qwe',
            },
        });
        return {
            result: true,
            document,
        };
    }
    async update(body, user) {
        const { id, title, content, tags } = body;
        const document = await this.uploadModel.findOne({
            _id: id,
            userId: user.id,
        });
        if (!document) {
            throw new common_2.NotFoundException('문서를 찾을 수 없습니다.');
        }
        document.title = title || document.title;
        document.content = content || document.content;
        if (tags) {
            document.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
        }
        await document.save();
        await axios_1.default.post(`${process.env.ES_URL}/documents/_update/${id}`, {
            doc: {
                title: document.title,
                content: document.content,
            },
        }, {
            auth: {
                username: 'elastic',
                password: process.env.ES_PASSWORD || '123!@#qwe',
            },
        });
        return {
            result: true,
            document,
        };
    }
    async delete(id, user) {
        const document = await this.uploadModel.findOne({
            _id: id,
            userId: user.id,
        });
        if (!document) {
            throw new common_2.NotFoundException('문서를 찾을 수 없습니다.');
        }
        for (const file of document.files) {
            await this.s3Client.send(new client_s3_2.DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: file.fileKey,
            }));
        }
        await document.deleteOne();
        await axios_1.default.delete(`${process.env.ES_URL}/documents/_doc/${id}`, {
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
    async favorite(body, user) {
        const { id, isFavorite } = body;
        const document = await this.uploadModel.findOne({
            _id: id,
            userId: user.id,
        });
        if (!document) {
            throw new common_2.NotFoundException('문서를 찾을 수 없습니다.');
        }
        document.isFavorite = isFavorite;
        await document.save();
        await axios_1.default.post(`${process.env.ES_URL}/documents/_update/${id}`, {
            doc: {
                isFavorite: document.isFavorite,
            },
        }, {
            auth: {
                username: 'elastic',
                password: process.env.ES_PASSWORD || '123!@#qwe',
            },
        });
        return {
            result: true,
            document,
        };
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(upload_schema_1.Upload.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DocumentService);
//# sourceMappingURL=document.service.js.map