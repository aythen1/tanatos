import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importación de TypeOrmModule
import { Usuario } from './entities/user-type.entity'; // Importación de la entidad correspondiente
import { UsuarioService } from './service/user-type.service';
import { UsuarioController } from './controller/user-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // Importación de la entidad con TypeOrmModule
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UserTypeModule {}
