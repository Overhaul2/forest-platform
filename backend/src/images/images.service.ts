import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma.service';
import { ImageRepository } from 'src/images/image.repository';
import { Prisma } from 'generated/prisma/client';
import { GbifMedia } from 'src/gbif/entities/gbif-media';

@Injectable()
export class ImagesService {
  constructor(
    private readonly repository: ImageRepository,
    private readonly prisma: PrismaService,
  ) {}

  async import(tx: Prisma.TransactionClient, speciesId: string, medias: any[]) {
    for (const item of medias) {
      const media: GbifMedia = {
        identifier: item.identifier,
        url: item.identifier,
        type: item.type,
        format: item.format,
        license: item.license,
        rightsHolder: item.rightsHolder,
        creator: item.creator,
        publisher: item.publisher,
        contributor: item.contributor,
        created: item.created,
        source: item.source,
        references: item.references,
        description: item.description,
      };
      await this.repository.upsert(tx, speciesId, media);
    }
  }

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
