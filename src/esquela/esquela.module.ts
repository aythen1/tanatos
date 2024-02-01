import { Module } from '@nestjs/common';
import { EsquelasService } from './services/esquela.service';
import { EsquelasController } from './controllers/esquela.controller';

@Module({
  controllers: [EsquelasController],
  providers: [EsquelasService],
})
export class EsquelaModule {}
