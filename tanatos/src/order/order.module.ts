import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación de TypeOrmModule
import { Order } from './entities/order.entity'; // Importación de la entidad correspondiente
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])], // Importación de la entidad con TypeOrmModule
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
