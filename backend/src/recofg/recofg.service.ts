import { Injectable } from '@nestjs/common';
import { CreateRecofgDto } from './dto/create-recofg.dto';
import { UpdateRecofgDto } from './dto/update-recofg.dto';

@Injectable()
export class RecofgService {
  create(createRecofgDto: CreateRecofgDto) {
    return 'This action adds a new recofg';
  }

  findAll() {
    return `This action returns all recofg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recofg`;
  }

  update(id: number, updateRecofgDto: UpdateRecofgDto) {
    return `This action updates a #${id} recofg`;
  }

  remove(id: number) {
    return `This action removes a #${id} recofg`;
  }
}
