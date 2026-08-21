import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.PRISMA_DATABASE_URL as string });
    super({
      adapter,
      log: ['query', 'warn', 'error'],
    });
  }
  async onModuleInit() {
    // throw new Error('Method not implemented.');
    await this.$connect();
  }

  async onModuleDestroy() {
    // throw new Error('Method not implemented.');
    await this.$disconnect();
  }
}
