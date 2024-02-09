import { Module } from '@nestjs/common';
import { EsquelasService } from './services/esquela.service';
import { EsquelasController } from './controllers/esquela.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EsquelaEntity } from './entities/esquela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EsquelaEntity])],
  controllers: [EsquelasController],
  providers: [EsquelasService],
})
export class EsquelaModule {}
