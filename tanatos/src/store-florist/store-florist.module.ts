import { Module } from '@nestjs/common';
import { StoreFloristService } from './service/store-florist.service';
import { StoreFloristController } from './controller/store-florist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreFlorist } from './entities/store-florist.entity'; // Importación de la entidad correspondiente
import { Usuario } from 'src/user-type/entities/user-type.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([StoreFlorist, Usuario]), // Asegúrate de importar también Usuario aquí
  ],
  controllers: [StoreFloristController],
  providers: [StoreFloristService],
})
export class StoreFloristModule {}
