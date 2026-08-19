import { Module } from '@nestjs/common';
import { GbifService } from './gbif.service';
import { GbifController } from './gbif.controller';
import { HttpModule } from '@nestjs/axios';
import { GbifMapper } from './mapper/GbifTaxonomyMapper';
import { GbifMediaMapper } from './mapper/GbifMediaMapper';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaxonomieModule } from 'src/taxonomie/taxonomie.module';
import { VernacularNamesModule } from 'src/vernacular-names/vernacular-names.module';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    TaxonomieModule,
    VernacularNamesModule,
    ImagesModule,
  ],
  controllers: [GbifController],
  providers: [GbifService, GbifMapper, GbifMediaMapper],
})
export class GbifModule {}
