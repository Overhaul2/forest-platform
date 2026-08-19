import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspeceDto } from './dto/create-espece.dto';
import { UpdateEspeceDto } from './dto/update-espece.dto';
import { PrismaService } from 'src/prisma.service';
import { QueryMode } from 'generated/prisma/internal/prismaNamespace';

@Injectable()
export class EspeceService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEspeceDto: CreateEspeceDto) {
    return this.prisma.species.create({
      data: createEspeceDto as any,
    });
  }
  async getSpeciesSuggestions(query: string) {
    const searchTerm = query?.trim();

    if (!searchTerm || searchTerm.length < 3) {
      return [];
    }

    return this.prisma.species.findMany({
      where: {
        OR: [
          {
            scientificName: {
              contains: searchTerm,
              mode: 'insensitive' as QueryMode,
            },
          },
          {
            canonicalName: {
              contains: searchTerm,
              mode: 'insensitive' as QueryMode,
            },
          },
          {
            vernacularNames: {
              some: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive' as QueryMode,
                },
              },
            },
          },
        ],
      },

      select: {
        id: true,
        scientificName: true,
        canonicalName: true,
        rank: true,

        genus: {
          select: {
            name: true,
          },
        },

        images: {
          take: 1,
          select: {
            url: true,
          },
        },

        vernacularNames: {
          take: 3,
          select: {
            name: true,
            language: true,
          },
        },
      },

      take: 8,
    });
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    search?: string;
    family?: string;
    genus?: string;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 12;

    const search = params.search?.trim();
    const family = params.family?.trim();
    const genus = params.genus?.trim();

    const where = {
      AND: [
        search
          ? {
              OR: [
                {
                  scientificName: {
                    contains: search,
                    mode: 'insensitive' as QueryMode,
                  },
                },
                {
                  canonicalName: {
                    contains: search,
                    mode: 'insensitive' as QueryMode,
                  },
                },
                {
                  vernacularNames: {
                    some: {
                      name: {
                        contains: search,
                        mode: 'insensitive' as QueryMode,
                      },
                    },
                  },
                },
              ],
            }
          : {},

        family
          ? {
              genus: {
                family: {
                  name: {
                    contains: family,
                    mode: 'insensitive' as QueryMode,
                  },
                },
              },
            }
          : {},

        genus
          ? {
              genus: {
                name: {
                  contains: genus,
                  mode: 'insensitive' as QueryMode,
                },
              },
            }
          : {},
      ],
    };

    const [data, total] = await Promise.all([
      this.prisma.species.findMany({
        where,
        include: {
          genus: {
            include: {
              family: true,
            },
          },
          images: {
            take: 1,
          },
          vernacularNames: {
            take: 3,
          },
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
          canonicalName: 'asc',
        },
      }),

      this.prisma.species.count({
        where,
      }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private findAllEspeces(params: {
    page: number;
    limit: number;
    search?: string;
    family?: string;
    genus?: string;
  }) {
    const { page, limit, search, family, genus } = params;

    return this.prisma.species.findMany({
      where: {
        AND: [
          search
            ? {
                OR: [
                  {
                    scientificName: {
                      contains: search,
                      mode: 'insensitive' as QueryMode,
                    },
                  },
                  {
                    canonicalName: {
                      contains: search,
                      mode: 'insensitive' as QueryMode,
                    },
                  },
                  {
                    vernacularNames: {
                      some: {
                        name: {
                          contains: search,
                          mode: 'insensitive' as QueryMode,
                        },
                      },
                    },
                  },
                ],
              }
            : undefined,
          family
            ? {
                family: {
                  name: { contains: family, mode: 'insensitive' as QueryMode },
                },
              }
            : undefined,
          genus
            ? {
                genus: {
                  name: { contains: genus, mode: 'insensitive' as QueryMode },
                },
              }
            : undefined,
        ].filter(Boolean),
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: string) {
    const species = await this.prisma.species.findUnique({
      where: {
        id,
      },

      include: {
        genus: {
          include: {
            family: true,
          },
        },

        vernacularNames: true,

        images: true,
      },
    });

    if (!species) {
      throw new NotFoundException('Espèce non trouvée');
    }

    return species;
  }

  async update(id: string, updateEspeceDto: UpdateEspeceDto) {
    const species = await this.prisma.species.findUnique({
      where: { id },
    });

    if (!species) {
      throw new NotFoundException('Espèce non trouvée');
    }

    return this.prisma.species.update({
      where: { id },
      data: updateEspeceDto,
    });
  }

  async findRecent(limit = 6) {
  return this.prisma.species.findMany({
    take: limit,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      genus: {
        include: {
          family: true,
        },
      },
      images: {
        take: 1,
      },
      vernacularNames: {
        take: 3,
      },
    },
  });
}
  remove(id: number) {
    return `This action removes a #${id} espece`;
  }
}
