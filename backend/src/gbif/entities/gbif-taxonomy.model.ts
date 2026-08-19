export class GbifTaxonomy {
  speciesKey!: number;

  scientificName!: string;
  canonicalName!: string;
  scientificAuthor?: string;

  rank!: string;
  status!: string;

  kingdom!: TaxonNode;
  phylum!: TaxonNode;
  taxonomicClass!: TaxonNode;
  order!: TaxonNode;
  family!: TaxonNode;
  genus!: TaxonNode;
  species!: TaxonNode;
}

export class TaxonNode {
  gbifKey!: number;
  name!: string;
}
