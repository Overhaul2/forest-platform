import { PartialType } from '@nestjs/swagger';
import { CreateRecofgDto } from './create-recofg.dto';

export class UpdateRecofgDto extends PartialType(CreateRecofgDto) {}
