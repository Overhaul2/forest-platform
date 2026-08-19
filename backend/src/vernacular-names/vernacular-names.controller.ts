import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VernacularNamesService } from './vernacular-names.service';
import { CreateVernacularNameDto } from './dto/create-vernacular-name.dto';
import { UpdateVernacularNameDto } from './dto/update-vernacular-name.dto';

@Controller('vernacular-names')
export class VernacularNamesController {
  constructor(private readonly vernacularNamesService: VernacularNamesService) {}

  @Post()
  create(@Body() createVernacularNameDto: CreateVernacularNameDto) {
    return this.vernacularNamesService.create(createVernacularNameDto);
  }

  @Get()
  findAll() {
    return this.vernacularNamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vernacularNamesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVernacularNameDto: UpdateVernacularNameDto) {
    return this.vernacularNamesService.update(+id, updateVernacularNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vernacularNamesService.remove(+id);
  }
}
