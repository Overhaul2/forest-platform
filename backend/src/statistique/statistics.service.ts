import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStatistics() {
    const [
      species,
      genera,
      families,
      images,
      vernacularNames,
      bibliography,
      distributions,
    ] = await Promise.all([
      this.prisma.species.count(),
      this.prisma.genus.count(),
      this.prisma.family.count(),
      this.prisma.image.count(),
      this.prisma.vernacularName.count(),
      this.prisma.reference.count(),

      this.prisma.species.findMany({
        select: {
          distribution: true,
        },
      }),
    ]);

    const countries = new Set<string>();

    for (const item of distributions) {
      if (!item.distribution) continue;

      item.distribution
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean)
        .forEach((x) => countries.add(x));
    }

    return {
      species,
      genera,
      families,
      images,
      countries: countries.size,
      vernacularNames,
      bibliography,
    };
  }
}
