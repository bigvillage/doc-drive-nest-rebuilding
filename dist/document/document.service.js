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
const common_2 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const upload_schema_1 = require("./schemas/upload.schema");
let DocumentService = class DocumentService {
    uploadModel;
    constructor(uploadModel) {
        this.uploadModel = uploadModel;
    }
    async findAll(query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const filter = {};
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
            throw new common_2.BadRequestException('검색어를 입력해주세요.');
        }
        const response = await axios_1.default.post(`${process.env.ES_URL}/documents/_search`, {
            query: {
                wildcard: {
                    title: `*${keyword}*`,
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
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(upload_schema_1.Upload.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DocumentService);
//# sourceMappingURL=document.service.js.map