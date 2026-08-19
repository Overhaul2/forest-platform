import { Module } from '@nestjs/common';
import { EspeceService } from './espece.service';
import { EspeceController } from './espece.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EspeceController],
  providers: [EspeceService],
})
export class EspeceModule {}
