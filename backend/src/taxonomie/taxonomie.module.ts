import { Module } from '@nestjs/common';
import { TaxonomieService } from './taxonomie.service';
import { TaxonomieController } from './taxonomie.controller';
import { TaxonomyRepository } from './taxonomy.repository';

@Module({
  controllers: [TaxonomieController],
  providers: [TaxonomieService, TaxonomyRepository],
  exports: [TaxonomieService],
})
export class TaxonomieModule {}
