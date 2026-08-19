import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma.service';
import { TaxonomieService } from 'src/taxonomie/taxonomie.service';
import { GbifMapper } from './mapper/GbifTaxonomyMapper';
import { VernacularNamesService } from 'src/vernacular-names/vernacular-names.service';
import { ImagesService } from 'src/images/images.service';
import { CreateGbifDto } from './dto/create-gbif.dto';
import { UpdateGbifDto } from './dto/update-gbif.dto';
@Injectable()
export class GbifService {
  constructor(
    private readonly http: HttpService,
    private readonly prisma: PrismaService,
    private readonly taxonomyService: TaxonomieService,
    private readonly gbifMapper: GbifMapper,
    private readonly vernacularNameService: VernacularNamesService,
    private readonly imageService: ImagesService,
  ) {}
  baseUrl = 'https://api.gbif.org/v1/species';

  async importSpecies(scientificName: string) {
    const url = `https://api.gbif.org/v1/species/match?name=${encodeURIComponent(scientificName)}`;

    const { data } = await firstValueFrom(this.http.get(url));

    if (!data.usageKey) {
      throw new NotFoundException('Espèce non trouvée.');
    }
    const taxonomy = this.gbifMapper.map(data);

    return this.prisma.$transaction(async (tx) => {
      const species = await this.taxonomyService.importSpecies(tx, taxonomy);

      const vernaculars = await this.fetchVernacularNames(taxonomy.speciesKey);

      await this.vernacularNameService.import(
        tx,
        species.species.id,
        vernaculars,
      );

      const medias = await this.fetchMedia(taxonomy.speciesKey);

      await this.imageService.import(tx, species.species.id, medias);

      return species;
    });
  }
  private async fetchVernacularNames(speciesKey: number) {
    const url = `https://api.gbif.org/v1/species/${speciesKey}/vernacularNames`;

    const { data } = await firstValueFrom(this.http.get(url));

    return data.results;
  }

  private async fetchMedia(speciesKey: number) {
    const url = `https://api.gbif.org/v1/species/${speciesKey}/media`;

    const { data } = await firstValueFrom(this.http.get(url));

    return data.results;
  }

  async searchDatabase(query: string) {
    const searchTerm = query?.trim();

    if (!searchTerm) {
      throw new BadRequestException('Le terme de recherche est obligatoire.');
    }

    const species = await this.prisma.species.findFirst({
      where: {
        OR: [
          {
            scientificName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            canonicalName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            vernacularNames: {
              some: {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive',
                },
              },
            },
          },
        ],
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

    // Espèce déjà présente en base
    if (species) {
      return {
        query: searchTerm,
        source: 'database',
        species,
      };
    }

    // Sinon recherche/import GBIF
    const imported = await this.importSpecies(searchTerm);

    return {
      query: searchTerm,
      source: 'gbif',

      // IMPORTANT :
      // importSpecies retourne probablement { species, ... }
      species: imported.species ?? imported,
    };
  }

  create(createGbifDto: CreateGbifDto) {
    return 'This action adds a new gbif';
  }

  findAll() {
    return `This action returns all gbif`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gbif`;
  }

  update(id: number, updateGbifDto: UpdateGbifDto) {
    return `This action updates a #${id} gbif`;
  }

  remove(id: number) {
    return `This action removes a #${id} gbif`;
  }
}
