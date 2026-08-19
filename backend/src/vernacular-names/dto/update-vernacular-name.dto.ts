import { PartialType } from '@nestjs/swagger';
import { CreateVernacularNameDto } from './create-vernacular-name.dto';

export class UpdateVernacularNameDto extends PartialType(CreateVernacularNameDto) {}
