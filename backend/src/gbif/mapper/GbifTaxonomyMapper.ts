import { Injectable } from '@nestjs/common';
import { TaxonomyImportDto } from 'src/taxonomie/dto/taxonomi-import.dto';

@Injectable()
export class GbifMapper {
  map(data: any): TaxonomyImportDto {
    return {
      speciesKey: data.speciesKey,

      scientificName: data.scientificName,
      canonicalName: data.canonicalName,
      scientificAuthor: this.extractAuthor(data.scientificName),

      rank: data.rank,
      status: data.status,

      kingdom: data.kingdom,
      kingdomKey: data.kingdomKey,

      phylum: data.phylum,
      phylumKey: data.phylumKey,

      class: data.class,
      classKey: data.classKey,
      taxonomicClass: data.class,

      order: data.order,
      orderKey: data.orderKey,

      family: data.family,
      familyKey: data.familyKey,

      genus: data.genus,
      genusKey: data.genusKey,

      species: data.species,
    };
  }

  private extractAuthor(scientificName: string): string | undefined {
    const canonical = scientificName.split(' ').slice(0, 2).join(' ');
    const author = scientificName.replace(canonical, '').trim();

    return author || undefined;
  }
}
