import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecofgService } from './recofg.service';
import { CreateRecofgDto } from './dto/create-recofg.dto';
import { UpdateRecofgDto } from './dto/update-recofg.dto';

@Controller('recofg')
export class RecofgController {
  constructor(private readonly recofgService: RecofgService) {}

  @Post()
  create(@Body() createRecofgDto: CreateRecofgDto) {
    return this.recofgService.create(createRecofgDto);
  }

  @Get()
  findAll() {
    return this.recofgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recofgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecofgDto: UpdateRecofgDto) {
    return this.recofgService.update(+id, updateRecofgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recofgService.remove(+id);
  }
}
