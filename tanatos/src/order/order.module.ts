import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación de TypeOrmModule
import { Order } from './entities/order.entity'; // Importación de la entidad correspondiente
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { StoreFlorist } from '../store-florist/entities/store-florist.entity'; // Importa la entidad StoreFlorist
import { StoreFloristModule } from '../store-florist/store-florist.module'; // Importa el módulo StoreFloristModule
import { Funeral } from 'src/funeral/entities/funeral.entity';
import { Usuario } from 'src/user-type/entities/user-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, StoreFlorist, Funeral, Usuario]), // Importa los repositorios de órdenes y de floristerías
    StoreFloristModule, // Importa el módulo StoreFloristModule
    Funeral,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
