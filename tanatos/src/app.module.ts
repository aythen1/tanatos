import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { FuneralModule } from './funeral/funeral.module';
import { OrderModule } from './order/order.module';
import { UserTypeModule } from './user-type/user-type.module';
import { StoreFloristModule } from './store-florist/store-florist.module';
console.log('es solo para subir el repo');
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot(DataSourceConfig),
    FuneralModule,
    OrderModule,
    UserTypeModule,
    StoreFloristModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
