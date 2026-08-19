import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaxonomieService } from './taxonomie.service';
import { CreateTaxonomieDto } from './dto/create-taxonomie.dto';
import { UpdateTaxonomieDto } from './dto/update-taxonomie.dto';

@Controller('taxonomie')
export class TaxonomieController {
  constructor(private readonly taxonomieService: TaxonomieService) {}

  @Post()
  create(@Body() createTaxonomieDto: CreateTaxonomieDto) {
    return this.taxonomieService.create(createTaxonomieDto);
  }

  @Get()
  findAll() {
    return this.taxonomieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxonomieService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaxonomieDto: UpdateTaxonomieDto,
  ) {
    return this.taxonomieService.update(+id, updateTaxonomieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxonomieService.remove(+id);
  }
}
