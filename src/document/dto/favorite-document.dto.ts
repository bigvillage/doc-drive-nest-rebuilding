import { IsBoolean, IsMongoId } from 'class-validator';

export class FavoriteDocumentDto {
  @IsMongoId()
  id: string;

  @IsBoolean()
  isFavorite: boolean;
}
