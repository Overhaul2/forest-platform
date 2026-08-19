import { Module } from '@nestjs/common';
import { RecofgService } from './recofg.service';
import { RecofgController } from './recofg.controller';

@Module({
  controllers: [RecofgController],
  providers: [RecofgService],
})
export class RecofgModule {}
