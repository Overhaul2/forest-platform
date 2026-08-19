import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GbifMedia } from 'src/gbif/entities/gbif-media';

@Injectable()
export class ImageRepository {
  async upsert(
    tx: Prisma.TransactionClient,
    speciesId: string,
    media: GbifMedia,
  ) {
    return tx.image.upsert({
      where: {
        gbifIdentifier: media.identifier,
      },
      update: {
        url: media.url ?? null,
        type: media.type ?? null,
        format: media.format ?? null,
        title: media.title ?? null,
        creator: media.creator ?? null,
        publisher: media.publisher ?? null,
        license: media.license ?? null,
        rightsHolder: media.rightsHolder ?? null,
        references: media.references ?? null,
      },
      create: {
        gbifIdentifier: media.identifier,
        url: media.url ?? null,
        type: media.type ?? null,
        format: media.format ?? null,
        title: media.title ?? null,
        creator: media.creator ?? null,
        publisher: media.publisher ?? null,
        license: media.license ?? null,
        rightsHolder: media.rightsHolder ?? null,
        references: media.references ?? null,
        speciesId,
        source: 'GBIF',
      },
    });
  }
}
