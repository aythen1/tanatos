import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/user-type.entity';
import { CreateUsuarioDto } from '../dto/create-user-type.dto';
import { UpdateUsuarioDto } from '../dto/update-user-type.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    console.log('Creando nuevo usuario...');
    try {
      // Encriptar la contraseña antes de guardarla en la base de datos
      const hashedPassword = await bcrypt.hash(createUsuarioDto.password, 10);

      // Crear un nuevo objeto Usuario con la contraseña encriptada
      const usuario = this.usuarioRepository.create({
        ...createUsuarioDto,
        password: hashedPassword,
      });

      // Guardar el usuario en la base de datos
      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      console.error(`Error al crear usuario: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<Usuario[]> {
    console.log('Buscando todos los usuarios...');
    try {
      return await this.usuarioRepository.find();
    } catch (error) {
      console.error(`Error al buscar usuarios: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: number | string): Promise<Usuario> {
    console.log(`Buscando usuario con ID ${id}...`);
    try {
      // Convertir el ID a número si es un string
      const userId = typeof id === 'string' ? parseInt(id, 10) : id;

      const usuario = await this.usuarioRepository.findOne({
        where: { id: userId },
      });
      if (!usuario) {
        throw new Error(`Usuario con ID ${userId} no encontrado`);
      }
      return usuario;
    } catch (error) {
      console.error(`Error al buscar usuario: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, usuario: Usuario): Promise<Usuario> {
    console.log(`Actualizando usuario con ID ${id}...`);
    try {
      const usuarioExistente = await this.findOne(id);
      if (!usuarioExistente) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
      }
      const usuarioActualizado = await this.usuarioRepository.save({
        ...usuarioExistente,
        ...usuario,
      });
      return usuarioActualizado;
    } catch (error) {
      console.error(`Error al actualizar usuario: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    console.log(`Eliminando usuario con ID ${id}...`);
    try {
      const usuario = await this.findOne(id);
      await this.usuarioRepository.remove(usuario);
    } catch (error) {
      console.error(`Error al eliminar usuario: ${error.message}`);
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    console.log('entro al buscador por email');
    console.log(`Buscando usuario con email ${email}...`);
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { email },
      });
      console.log('usuario', usuario);
      return usuario;
    } catch (error) {
      console.error(`Error al buscar usuario por email: ${error.message}`);
      throw error;
    }
  }

  async updatePassword(id: number, newPassword: string): Promise<Usuario> {
    try {
      console.log(`Buscando usuario con ID ${id}...`);
      const usuario = await this.findOne(id);

      console.log('Hasheando la nueva contraseña...');
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      console.log('Actualizando la contraseña del usuario...');
      usuario.password = hashedPassword;

      return await this.usuarioRepository.save(usuario);
    } catch (error) {
      console.error(`Error al actualizar la contraseña: ${error.message}`);
      throw error;
    }
  }
}
