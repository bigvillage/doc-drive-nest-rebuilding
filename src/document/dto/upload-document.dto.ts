import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadDocumentDto {
  @ApiProperty({
    description: '문서 제목',
    example: 'NestJS 프로젝트',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: '문서 내용',
    example: 'NestJS로 마이그레이션한 프로젝트입니다.',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: '태그',
    example: ['NestJS', 'MongoDB'],
  })
  @IsOptional()
  tags?: string | string[];
}
