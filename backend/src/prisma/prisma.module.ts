import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
@Global()
export class PrismaModule {}
