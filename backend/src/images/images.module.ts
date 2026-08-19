import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImageRepository } from './image.repository';
import { GbifMediaMapper } from 'src/gbif/mapper/GbifMediaMapper';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, ImageRepository, GbifMediaMapper],
  exports: [ImagesService],
})
export class ImagesModule {}
