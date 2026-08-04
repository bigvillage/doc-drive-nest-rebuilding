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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSchema = exports.Upload = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Upload = class Upload {
    title;
    content;
    tags;
    files;
    isFavorite;
    userId;
    createdAt;
    updatedAt;
    isUpdated;
};
exports.Upload = Upload;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    __metadata("design:type", String)
], Upload.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Upload.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        default: [],
    }),
    __metadata("design:type", Array)
], Upload.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        {
            fileKey: String,
            originalName: String,
            size: Number,
            fileUrl: String,
        },
    ]),
    __metadata("design:type", Array)
], Upload.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Upload.prototype, "isFavorite", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Upload.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: Date.now,
    }),
    __metadata("design:type", Date)
], Upload.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Upload.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Upload.prototype, "isUpdated", void 0);
exports.Upload = Upload = __decorate([
    (0, mongoose_1.Schema)({
        collection: 'uploads',
    })
], Upload);
exports.UploadSchema = mongoose_1.SchemaFactory.createForClass(Upload);
//# sourceMappingURL=upload.schema.js.map