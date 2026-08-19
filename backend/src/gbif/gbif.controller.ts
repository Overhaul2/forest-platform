import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GbifService } from './gbif.service';
import { CreateGbifDto } from './dto/create-gbif.dto';
import { UpdateGbifDto } from './dto/update-gbif.dto';
import { ImportSpeciesDto } from './dto/import-species.dto';

@Controller('gbif')
export class GbifController {
  constructor(private readonly gbifService: GbifService) {}

  @Post()
  create(@Body() createGbifDto: CreateGbifDto) {
    return this.gbifService.create(createGbifDto);
  }

  @Post('import')
  importSpecies(@Body() dto: ImportSpeciesDto) {
    return this.gbifService.importSpecies(dto.scientificName);
  }

  @Get('search')
  search(@Query('q') query: string) {
    console.log('🔎 Recherche reçue par le backend :', query);
    return this.gbifService.searchDatabase(query);
  }

  @Get()
  findAll() {
    return this.gbifService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gbifService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGbifDto: UpdateGbifDto) {
    return this.gbifService.update(+id, updateGbifDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gbifService.remove(+id);
  }
}
