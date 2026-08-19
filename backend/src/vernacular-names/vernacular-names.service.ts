/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateVernacularNameDto } from './dto/create-vernacular-name.dto';
import { UpdateVernacularNameDto } from './dto/update-vernacular-name.dto';
import { VernacularNameRepository } from './vernacular-name.repository';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class VernacularNamesService {
  constructor(private readonly repository: VernacularNameRepository,
  ) { }

  async import(
    tx: Prisma.TransactionClient,
    speciesId: string,
    names: any[],
  ) {

    for (const vernacular of names) {

      await this.repository.upsert(
        tx,
        speciesId,
        vernacular,
      );

    }

  }
  
  create(createVernacularNameDto: CreateVernacularNameDto) {
    return 'This action adds a new vernacularName';
  }

  findAll() {
    return `This action returns all vernacularNames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vernacularName`;
  }

  update(id: number, updateVernacularNameDto: UpdateVernacularNameDto) {
    return `This action updates a #${id} vernacularName`;
  }

  remove(id: number) {
    return `This action removes a #${id} vernacularName`;
  }
}
