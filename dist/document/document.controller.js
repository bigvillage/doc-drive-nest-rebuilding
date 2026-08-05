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
const document_service_1 = require("./document.service");
const node_stream_1 = require("node:stream");
const platform_express_1 = require("@nestjs/platform-express");
let DocumentController = class DocumentController {
    documentService;
    constructor(documentService) {
        this.documentService = documentService;
    }
    findAll(query) {
        return this.documentService.findAll(query);
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
    async upload(body, files, req) {
        return this.documentService.upload(body, files, req.user);
    }
    update(body) {
        return this.documentService.update(body);
    }
    remove(id) {
        return this.documentService.delete(id);
    }
    favorite(body) {
        return this.documentService.favorite(body);
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "upload", null);
__decorate([
    (0, common_1.Put)('upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('upload'),
    __param(0, (0, common_1.Body)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('upload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "favorite", null);
exports.DocumentController = DocumentController = __decorate([
    (0, common_1.Controller)('document'),
    __metadata("design:paramtypes", [document_service_1.DocumentService])
], DocumentController);
//# sourceMappingURL=document.controller.js.map