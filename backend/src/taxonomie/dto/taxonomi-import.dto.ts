export interface TaxonomyImportDto {
  kingdom: string;
  kingdomKey: number;

  phylum: string;
  phylumKey: number;

  class: string;
  classKey: number;

  order: string;
  orderKey: number;

  family: string;
  familyKey: number;

  genus: string;
  rank?: string;
  taxonomicClass?: string;
  status?: string;
  genusKey: number;
  scientificName: string;
  canonicalName: string;
  scientificAuthor?: string;

  species?: string;
  speciesKey?: number;
}
