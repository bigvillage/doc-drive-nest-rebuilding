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
exports.FavoriteDocumentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class FavoriteDocumentDto {
    id;
    isFavorite;
}
exports.FavoriteDocumentDto = FavoriteDocumentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '문서 ID',
        example: '6892d0d3f0f6a1b0d9d7d123',
    }),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], FavoriteDocumentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: '즐겨찾기 여부',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], FavoriteDocumentDto.prototype, "isFavorite", void 0);
//# sourceMappingURL=favorite-document.dto.js.map