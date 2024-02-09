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
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const { email, password } = credentials;

    try {
      // Verificar si el usuario existe
      console.log(`Buscando usuario con email: ${email}...`);
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        console.log(`El usuario con email ${email} no fue encontrado.`);
        throw new NotFoundException('User not found');
      }

      // Verificar si la contraseña es correcta
      console.log(
        `Verificando contraseña para el usuario con email: ${email}...`,
      );
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log(
          `Contraseña incorrecta para el usuario con email: ${email}.`,
        );
        throw new UnauthorizedException('Invalid credentials');
      }

      console.log(
        `Inicio de sesión exitoso para el usuario con email: ${email}.`,
      );
      // Devolver solo los datos necesarios del usuario
      const { id, username, email: userEmail } = user;
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: {
          id,
          username,
          email: userEmail,
        },
      };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        return {
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        };
      } else {
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

  // Ruta para verificar la existencia de un correo electrónico en la base de datos
  @Get('check-email/:email')
  async checkEmailExists(@Param('email') email: string) {
    try {
      // Buscar el usuario por correo electrónico
      console.log(`Buscando usuario con email: ${email}...`);
      const user = await this.usersService.findByEmail(email);

      // Si se encuentra el usuario, devolver un estado 200
      if (user) {
        console.log(`El usuario con email ${email} fue encontrado.`);
        return {
          statusCode: HttpStatus.OK,
          message: 'Email found in database',
        };
      } else {
        console.log(`El usuario con email ${email} no fue encontrado.`);
        return {
          statusCode: 404,
          message: 'Email not found in database',
        };
      }
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw new NotFoundException('Email not found in database');
    }
  }
}
