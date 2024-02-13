import { Module } from '@nestjs/common';
import { FuneralService } from './service/funeral.service';
import { FuneralController } from './controller/funeral.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funeral } from './entities/funeral.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Funeral])],

  controllers: [FuneralController],
  providers: [FuneralService],
})
export class FuneralModule {}
