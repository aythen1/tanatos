import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { EsquelaModule } from './esquela/esquela.module';
import { PedidoModule } from './pedido/pedido.module';
import { FloristeriaModule } from './floristeria/floristeria.module';
import { TanatorioModule } from './tanatorio/tanatorio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    EsquelaModule,
    PedidoModule,
    FloristeriaModule,
    TanatorioModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
