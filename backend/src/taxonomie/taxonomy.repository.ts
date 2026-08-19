import { Injectable } from '@nestjs/common';

@Injectable()
export class TaxonomyRepository {
  async findOrCreate<
    TDelegate extends {
      upsert(args: any): Promise<any>;
    },
  >(
    delegate: TDelegate,
    where: Record<string, any>,
    create: Record<string, any>,
    update: Record<string, any> = {},
  ) {
    return delegate.upsert({
      where,
      create,
      update,
    });
  }
}
