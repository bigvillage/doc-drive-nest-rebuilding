import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDocumentDto {
  @ApiProperty({
    description: '문서 ID',
    example: '6892d0d3f0f6a1b0d9d7d123',
  })
  @IsMongoId()
  id?: string;

  @ApiPropertyOptional({
    description: '수정할 제목',
    example: 'NestJS 프로젝트 수정',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    description: '수정할 내용',
    example: '수정된 문서 내용입니다.',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: '수정할 태그',
    example: ['NestJS', 'Swagger'],
  })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
