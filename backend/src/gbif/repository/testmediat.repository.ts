// import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
// import { GbifMedia } from '../gbif/domain/gbif-media';

// @Injectable()
// export class MediaRepository {
//   async upsert(
//     tx: Prisma.TransactionClient,
//     speciesId: string,
//     media: GbifMedia,
//   ) {
//     return tx.image.upsert({
//       where: {
//         gbifIdentifier: media.identifier,
//       },
//       update: {
//         url: media.url,
//         type: media.type,
//         format: media.format,
//         title: media.title,
//         creator: media.creator,
//         publisher: media.publisher,
//         license: media.license,
//         rightsHolder: media.rightsHolder,
//         references: media.references,
//       },
//       create: {
//         gbifIdentifier: media.identifier,
//         url: media.url,
//         type: media.type,
//         format: media.format,
//         title: media.title,
//         creator: media.creator,
//         publisher: media.publisher,
//         license: media.license,
//         rightsHolder: media.rightsHolder,
//         references: media.references,
//         speciesId,
//         source: 'GBIF',
//       },
//     });
//   }
// }
