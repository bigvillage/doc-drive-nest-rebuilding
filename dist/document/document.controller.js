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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const document_service_1 = require("./document.service");
const node_stream_1 = require("node:stream");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const upload_document_dto_1 = require("./dto/upload-document.dto");
const update_document_dto_1 = require("./dto/update-document.dto");
const favorite_document_dto_1 = require("./dto/favorite-document.dto");
const list_document_dto_1 = require("./dto/list-document.dto");
let DocumentController = class DocumentController {
    documentService;
    constructor(documentService) {
        this.documentService = documentService;
    }
    findAll(query, user) {
        return this.documentService.findAll(query, user);
    }
    search(q) {
        return this.documentService.search(q);
    }
    async download(fileUrl, originalName, res) {
        const response = await this.documentService.download(fileUrl);
        const body = response.Body;
        if (!(body instanceof node_stream_1.Readable)) {
            throw new common_1.InternalServerErrorException('파일을 읽을 수 없습니다.');
        }
        res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(originalName)}`);
        res.setHeader('Content-Type', response.ContentType || 'application/octet-stream');
        body.pipe(res);
    }
    async upload(body, files, user) {
        return this.documentService.upload(body, files, user);
    }
    update(body, user) {
        return this.documentService.update(body, user);
    }
    remove(id, user) {
        return this.documentService.delete(id, user);
    }
    favorite(body, user) {
        return this.documentService.favorite(body, user);
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '문서 목록 조회' }),
    (0, swagger_1.ApiCookieAuth)('token'),
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_document_dto_1.ListDocumentDto, Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('download'),
    __param(0, (0, common_1.Query)('url')),
    __param(1, (0, common_1.Query)('name')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "download", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '문서 업로드' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiCookieAuth)('token'),
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, {
        limits: {
            fileSize: 20 * 1024 * 1024,
        },
        fileFilter(req, file, callback) {
            const allowExt = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|hwp|hwpx|txt|png|jpg|jpeg|gif)$/i;
            if (!allowExt.test(file.originalname)) {
                return callback(new common_1.BadRequestException('허용되지 않는 파일 형식입니다.'), false);
            }
            callback(null, true);
        },
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_document_dto_1.UploadDocumentDto, Array, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "upload", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '문서 수정' }),
    (0, swagger_1.ApiCookieAuth)('token'),
    (0, common_1.Put)('upload'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_document_dto_1.UpdateDocumentDto, Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '문서 삭제' }),
    (0, swagger_1.ApiCookieAuth)('token'),
    (0, common_1.Delete)('upload'),
    __param(0, (0, common_1.Body)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: '즐겨찾기 변경' }),
    (0, swagger_1.ApiCookieAuth)('token'),
    (0, common_1.Patch)('upload'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [favorite_document_dto_1.FavoriteDocumentDto, Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "favorite", null);
exports.DocumentController = DocumentController = __decorate([
    (0, swagger_1.ApiTags)('Document'),
    (0, common_1.Controller)('document'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
//# sourceMappingURL=document.controller.js.map