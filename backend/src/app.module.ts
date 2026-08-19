import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { EspeceModule } from './espece/espece.module';
import { RecofgModule } from './recofg/recofg.module';
import { TaxonomieModule } from './taxonomie/taxonomie.module';
import { GbifModule } from './gbif/gbif.module';
import { VernacularNamesModule } from './vernacular-names/vernacular-names.module';
import { ImagesModule } from './images/images.module';
import { StatisticsModule } from './statistique/statistics.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    EspeceModule,
    RecofgModule,
    TaxonomieModule,
    GbifModule,
    VernacularNamesModule,
    ImagesModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
