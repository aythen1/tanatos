import { Module } from '@nestjs/common';
import { TanatorioService } from './services/tanatorio.service';
import { TanatorioController } from './controllers/tanatorio.controller';

@Module({
  controllers: [TanatorioController],
  providers: [TanatorioService],
})
export class TanatorioModule {}
