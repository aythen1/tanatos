import { Module } from '@nestjs/common';
import { PedidoService } from './services/pedido.service';
import { PedidoController } from './controllers/pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './entities/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity])],

  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
