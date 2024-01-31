import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Método para crear un nuevo usuario
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('Creando un nuevo usuario...');
      const createdUser = await this.usersService.createUser(createUserDto);
      console.log('Usuario creado exitosamente.');

      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        data: createdUser,
      };
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  // Método para obtener todos los usuarios
  @Get()
  findAll() {
    try {
      console.log('Obteniendo todos los usuarios...');
      const users = this.usersService.findAll();
      console.log('Usuarios obtenidos exitosamente.');

      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  // Método para buscar un usuario por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      console.log(`Buscando usuario con ID: ${id}...`);
      const user = this.usersService.findOne(+id); // Convertir a número
      console.log('Usuario encontrado exitosamente:', user);

      return user;
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  // Método para actualizar un usuario por ID
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      console.log(`Actualizando usuario con ID: ${id}...`);
      const updatedUser = await this.usersService.updateUser(id, updateUserDto);
      console.log('Usuario actualizado exitosamente:', updatedUser);

      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Usuario no encontrado:', error);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        };
      } else {
        console.error('Error al actualizar usuario:', error);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        };
      }
    }
  }

  // Método para eliminar un usuario por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      console.log(`Eliminando usuario con ID: ${id}...`);
      const result = this.usersService.remove(id);
      console.log('Usuario eliminado exitosamente.');

      return result;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }
}
