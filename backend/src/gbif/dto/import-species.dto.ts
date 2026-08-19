import { IsString, IsNotEmpty } from 'class-validator';
export class ImportSpeciesDto {
  @IsString()
  @IsNotEmpty()
  scientificName: string;
}
