import { PartialType } from '@nestjs/swagger';
import { CreateEspeceDto } from './create-espece.dto';

export class UpdateEspeceDto extends PartialType(CreateEspeceDto) {}
