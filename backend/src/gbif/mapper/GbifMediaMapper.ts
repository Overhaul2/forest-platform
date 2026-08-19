import { Injectable } from '@nestjs/common';
import { GbifMedia } from 'src/gbif/entities/gbif-media';

@Injectable()
export class GbifMediaMapper {
  map(data: any): GbifMedia {
    return {
      identifier: data.identifier,

      url: data.identifier,

      type: data.type,

      format: data.format,

      title: data.title,

      creator: data.creator,

      publisher: data.publisher,

      license: data.license,

      rightsHolder: data.rightsHolder,

      references: data.references,
    };
  }
}
