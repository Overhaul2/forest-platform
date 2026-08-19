import { Injectable } from '@nestjs/common';
import { CreateTaxonomieDto } from './dto/create-taxonomie.dto';
import { UpdateTaxonomieDto } from './dto/update-taxonomie.dto';
import { TaxonomyRepository } from './taxonomy.repository';
import { Prisma } from 'generated/prisma/client';
import { TaxonomyImportDto } from './dto/taxonomi-import.dto';

@Injectable()
export class TaxonomieService {
  constructor(private readonly taxonomyRepository: TaxonomyRepository) { }

  async createTaxonomyTree(
    tx: Prisma.TransactionClient,
    dto: TaxonomyImportDto,
  ) {
    const kingdom = await this.taxonomyRepository.findOrCreate(
      tx.kingdom,
      { name: dto.kingdom },
      {
        name: dto.kingdom,
        gbifKey: dto.kingdomKey,
      },
      {
        gbifKey: dto.kingdomKey,
      },
    );

    const phylum = await this.taxonomyRepository.findOrCreate(
      tx.phylum,
      { name: dto.phylum },
      {
        name: dto.phylum,
        gbifKey: dto.phylumKey,
        kingdomId: kingdom.id,
      },
      {
        gbifKey: dto.phylumKey,
        kingdomId: kingdom.id,
      },
    );

    const taxonomicClass = await this.taxonomyRepository.findOrCreate(
      tx.taxonomicClass,
      { name: dto.class },
      {
        name: dto.class,
        gbifKey: dto.classKey,
        phylumId: phylum.id,
      },
      {
        gbifKey: dto.classKey,
        phylumId: phylum.id,
      },
    );

    const order = await this.taxonomyRepository.findOrCreate(
      tx.taxonomicOrder,
      { name: dto.order },
      {
        name: dto.order,
        gbifKey: dto.orderKey,
        classId: taxonomicClass.id,
      },
      {
        gbifKey: dto.orderKey,
        classId: taxonomicClass.id,
      },
    );

    const family = await this.taxonomyRepository.findOrCreate(
      tx.family,
      { name: dto.family },
      {
        name: dto.family,
        gbifKey: dto.familyKey,
        orderId: order.id,
      },
      {
        gbifKey: dto.familyKey,
        orderId: order.id,
      },
    );

    const genus = await this.taxonomyRepository.findOrCreate(
      tx.genus,
      { name: dto.genus },
      {
        name: dto.genus,
        gbifKey: dto.genusKey,
        familyId: family.id,
      },
      {
        gbifKey: dto.genusKey,
        familyId: family.id,
      },
    );

    return {
      kingdom,
      phylum,
      taxonomicClass,
      order,
      family,
      genus,
    };
  }

  create(createTaxonomieDto: CreateTaxonomieDto) {
    return 'This action adds a new taxonomie';
  }

  findAll() {
    return `This action returns all taxonomie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taxonomie`;
  }

  update(id: number, updateTaxonomieDto: UpdateTaxonomieDto) {
    return `This action updates a #${id} taxonomie`;
  }

  remove(id: number) {
    return `This action removes a #${id} taxonomie`;
  }

  async findOrCreateKingdom(
    tx: Prisma.TransactionClient,
    name: string,
    gbifKey: number,
  ) {
    return this.taxonomyRepository.findOrCreate(
      tx.kingdom,
      { name },
      {
        name,
        gbifKey,
      },
      {
        gbifKey,
      },
    );
  }

  async findOrCreatePhylum(
    tx: Prisma.TransactionClient,
    name: string,
    gbifKey: number,
    kingdomId: string,
  ) {
    return this.taxonomyRepository.findOrCreate(
      tx.phylum,
      { name },
      {
        name,
        gbifKey,
        kingdomId,
      },
      {
        gbifKey,
        kingdomId,
      },
    );
  }

  async findOrCreateClass(
    tx: Prisma.TransactionClient,
    name: string,
    gbifKey: number,
    phylumId: string,
  ) {
    return this.taxonomyRepository.findOrCreate(
      tx.taxonomicClass,
      { name },
      {
        name,
        gbifKey,
        phylumId,
      },
      {
        gbifKey,
        phylumId,
      },
    );
  }

  async findOrCreateOrder(
    tx: Prisma.TransactionClient,
    name: string,
    gbifKey: number,
    classId: string,
  ) {
    return this.taxonomyRepository.findOrCreate(
      tx.taxonomicOrder,
      { name },
      {
        name,
        gbifKey,
        classId,
      },
      {
        gbifKey,
        classId,
      },
    );
  }

  async findOrCreateFamily(
    tx: Prisma.TransactionClient,
    name: string,
    gbifKey: number,
    orderId: string,
  ) {
    return this.taxonomyRepository.findOrCreate(
      tx.family,
      { name },
      {
        name,
        gbifKey,
        orderId,
      },
      {
        gbifKey,
        orderId,
      },
    );
  }

  async findOrCreateGenus(
    tx: Prisma.TransactionClient,
    name: string,
    gbifKey: number,
    familyId: string,
  ) {
    return this.taxonomyRepository.findOrCreate(
      tx.genus,
      { name },
      {
        name,
        gbifKey,
        familyId,
      },
      {
        gbifKey,
        familyId,
      },
    );
  }

  async importSpecies(tx: Prisma.TransactionClient,
    taxonomy: TaxonomyImportDto) {
    const kingdom = await this.taxonomyRepository.findOrCreate(
      tx.kingdom,
      { name: taxonomy.kingdom },
      {
        name: taxonomy.kingdom,
        gbifKey: taxonomy.kingdomKey,
      },
      {
        gbifKey: taxonomy.kingdomKey,
      },
    );

    const phylum = await this.taxonomyRepository.findOrCreate(
      tx.phylum,
      { name: taxonomy.phylum },
      {
        name: taxonomy.phylum,
        gbifKey: taxonomy.phylumKey,
        kingdomId: kingdom.id,
      },
      {
        gbifKey: taxonomy.phylumKey,
        kingdomId: kingdom.id,
      },
    );

    const taxonomicClass = await this.taxonomyRepository.findOrCreate(
      tx.taxonomicClass,
      { name: taxonomy.class },
      {
        name: taxonomy.class,
        gbifKey: taxonomy.classKey,
        phylumId: phylum.id,
      },
      {
        gbifKey: taxonomy.classKey,
        phylumId: phylum.id,
      },
    );

    const order = await this.taxonomyRepository.findOrCreate(
      tx.taxonomicOrder,
      { name: taxonomy.order },
      {
        name: taxonomy.order,
        gbifKey: taxonomy.orderKey,
        classId: taxonomicClass.id,
      },
      {
        gbifKey: taxonomy.orderKey,
        classId: taxonomicClass.id,
      },
    );

    const family = await this.taxonomyRepository.findOrCreate(
      tx.family,
      { name: taxonomy.family },
      {
        name: taxonomy.family,
        gbifKey: taxonomy.familyKey,
        orderId: order.id,
      },
      {
        gbifKey: taxonomy.familyKey,
        orderId: order.id,
      },
    );

    const genus = await this.taxonomyRepository.findOrCreate(
      tx.genus,
      { name: taxonomy.genus },
      {
        name: taxonomy.genus,
        gbifKey: taxonomy.genusKey,
        familyId: family.id,
      },
      {
        gbifKey: taxonomy.genusKey,
        familyId: family.id,
      },
    );

    const species = await tx.species.upsert({
      where: {
        gbifId: taxonomy.speciesKey,
      },
      update: {
        scientificName: taxonomy.scientificName,
        canonicalName: taxonomy.canonicalName,
        scientificAuthor: taxonomy.scientificAuthor,
        rank: taxonomy.rank,
        genusId: genus.id,
      },
      create: {
        gbifId: taxonomy.speciesKey,
        scientificName: taxonomy.scientificName,
        canonicalName: taxonomy.canonicalName,
        scientificAuthor: taxonomy.scientificAuthor,
        rank: taxonomy.rank,
        genusId: genus.id,
      },
    });

    return {
      kingdom,
      phylum,
      taxonomicClass,
      order,
      family,
      genus,
      species,
    };
  }
}
