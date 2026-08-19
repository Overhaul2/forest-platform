import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class VernacularNameRepository {
  async upsert(
    tx: Prisma.TransactionClient,
    speciesId: string,
    vernacular: any,
  ) {
    const existing = await tx.vernacularName.findFirst({
      where: {
        speciesId,
        name: vernacular.vernacularName,
        language: vernacular.language,
      },
    });

    if (existing) {
      return tx.vernacularName.update({
        where: { id: existing.id },
        data: {
          country: vernacular.country,
        },
      });
    }

    return tx.vernacularName.create({
      data: {
        speciesId,
        name: vernacular.vernacularName,
        language: vernacular.language,
        country: vernacular.country,
      },
    });
  }
}
