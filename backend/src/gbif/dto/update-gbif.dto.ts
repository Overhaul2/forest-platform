import { PartialType } from '@nestjs/swagger';
import { CreateGbifDto } from './create-gbif.dto';

export class UpdateGbifDto extends PartialType(CreateGbifDto) {}
