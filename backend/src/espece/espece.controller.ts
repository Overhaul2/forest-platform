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
import { EspeceService } from './espece.service';
import { CreateEspeceDto } from './dto/create-espece.dto';
import { UpdateEspeceDto } from './dto/update-espece.dto';

@Controller('espece')
export class EspeceController {
  constructor(private readonly especeService: EspeceService) {}

  @Post()
  create(@Body() createEspeceDto: CreateEspeceDto) {
    return this.especeService.create(createEspeceDto);
  }

  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('family') family?: string,
    @Query('genus') genus?: string,
  ) {
    return this.especeService.findAll({
      page: Number(page) || 1,
      limit: Number(limit) || 12,
      search,
      family,
      genus,
    });
  }

@Get('recent')
findRecent(@Query('limit') limit?: string) {
  return this.especeService.findRecent(
    Math.min(Number(limit) || 6, 20),
  );
}

  @Get('suggestions')
  suggestions(@Query('q') query: string) {
    return this.especeService.getSpeciesSuggestions(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEspeceDto: UpdateEspeceDto) {
    return this.especeService.update(id, updateEspeceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especeService.remove(+id);
  }
}
