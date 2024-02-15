import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { UsuarioService } from '../service/user-type.service';
import { CreateUsuarioDto } from '../dto/create-user-type.dto';
import { UpdateUsuarioDto } from '../dto/update-user-type.dto';
import * as bcrypt from 'bcrypt';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    console.log(createUsuarioDto);
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  async findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    // Obtener el usuario de la base de datos
    const usuario = await this.usuarioService.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Fusionar las propiedades del DTO con el objeto Usuario
    Object.assign(usuario, updateUsuarioDto);

    // Llamar al método update del servicio con el objeto Usuario
    return this.usuarioService.update(id, usuario);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.remove(id);
  }

  // Nueva ruta para buscar usuario por email
  @Post('by-email')
  async findOneByEmail(@Body() body: { email: string }) {
    const { email } = body;
    if (!email) {
      throw new BadRequestException('El campo email es requerido');
    }
    return this.usuarioService.findOneByEmail(email);
  }
  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const { email, password } = credentials;
    console.log('entra por aca y el email y password son:', email, password);
    try {
      // Verificar si el usuario existe
      console.log(`Buscando usuario con email: ${email}...`);
      const user = await this.usuarioService.findOneByEmail(email);
      if (!user) {
        console.log(`El usuario con email ${email} no fue encontrado.`);
        throw new NotFoundException('User not found');
      }

      // Verificar si la contraseña es correcta
      console.log(
        `Verificando contraseña para el usuario con email: ${email}...`,
      );
      console.log('usuario es', user);
      console.log('password es', password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('userpassword', user.password);
      console.log('isPasswordValid', isPasswordValid);
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
      const { id, username, email: userEmail, user_type } = user;
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: {
          id,
          username,
          email: userEmail,
          user_type,
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

  @Patch(':id/update-password')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('newPassword') new_password: string,
    @Body('oldPassword') old_password: string,
  ): Promise<any> {
    try {
      // Obtener el usuario por su ID
      const user = await this.usuarioService.findOne(id);
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }

      // Verificar si la contraseña antigua coincide
      const isOldPasswordValid = await bcrypt.compare(
        old_password,
        user.password,
      );
      if (!isOldPasswordValid) {
        throw new BadRequestException('La contraseña antigua es incorrecta');
      }

      // Encriptar la nueva contraseña antes de guardarla en la base de datos
      const hashedNewPassword = await bcrypt.hash(new_password, 10);

      // Actualizar la contraseña y la contraseña anterior en la base de datos
      user.old_password = old_password; // Guardar la contraseña antigua como old_password
      user.password = hashedNewPassword; // Guardar la nueva contraseña

      // Guardar los cambios en la base de datos
      await this.usuarioService.update(id, user);

      // Devolver la respuesta con la contraseña actualizada
      return {
        statusCode: HttpStatus.OK,
        message: 'Contraseña actualizada correctamente',
        data: user, // Se puede devolver el usuario actualizado si es necesario
      };
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al actualizar la contraseña',
      };
    }
  }
}