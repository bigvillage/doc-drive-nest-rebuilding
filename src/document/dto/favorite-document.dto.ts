import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId } from 'class-validator';

export class FavoriteDocumentDto {
  @ApiProperty({
    description: '문서 ID',
    example: '6892d0d3f0f6a1b0d9d7d123',
  })
  @IsMongoId()
  id: string;

  @ApiProperty({
    description: '즐겨찾기 여부',
    example: true,
  })
  @IsBoolean()
  isFavorite: boolean;
}
