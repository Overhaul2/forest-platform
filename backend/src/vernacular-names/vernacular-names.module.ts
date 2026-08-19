import { Module } from '@nestjs/common';
import { VernacularNamesService } from './vernacular-names.service';
import { VernacularNamesController } from './vernacular-names.controller';
import { VernacularNameRepository } from './vernacular-name.repository';

@Module({
  controllers: [VernacularNamesController],
  providers: [VernacularNamesService, VernacularNameRepository],
  exports: [VernacularNamesService],
})
export class VernacularNamesModule {}
