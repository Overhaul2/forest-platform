import { PartialType } from '@nestjs/swagger';
import { CreateTaxonomieDto } from './create-taxonomie.dto';

export class UpdateTaxonomieDto extends PartialType(CreateTaxonomieDto) {}
