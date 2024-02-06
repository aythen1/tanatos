import { Module } from '@nestjs/common';
import { FloristeriaService } from './services/floristeria.service';
import { FloristeriaController } from './controllers/floristeria.controller';

@Module({
  controllers: [FloristeriaController],
  providers: [FloristeriaService],
})
export class FloristeriaModule {}
