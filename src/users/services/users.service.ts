import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //CREAR USUARIO ----------------------------------------------------------------
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, email } = createUserDto;

    // Verificar si el correo ya está en uso
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      console.log('El correo ya está en uso. Lanzando una ConflictException.');
      throw new ConflictException('Email is already in use');
    }

    console.log('Creando nuevo usuario...');
    const newUser = this.userRepository.create(createUserDto);

    try {
      console.log('Hashing de la contraseña...');
      const hashedPassword = await bcrypt.hash(password, 10);

      // Asignar la contraseña hasheada al usuario
      newUser.password = hashedPassword;

      console.log('Guardando el nuevo usuario en la base de datos...');
      const savedUser = await this.userRepository.save(newUser);
      console.log('Guardado exitoso. Retornando el nuevo usuario.');

      // eslint-disable-line no-unused-vars
      const { password: _, ...userWithoutPassword } = savedUser;
      return userWithoutPassword as UserEntity;
    } catch (error) {
      // Manejar errores de base de datos
      console.error('Falla al crear usuario:', error);
      throw new InternalServerErrorException('Falla al crear usuario.');
    }
  }
  //BUSCAR POR EMAIL AL USUARIO ----------------------------------------------------------------
  async findByEmail(email: string): Promise<UserEntity | undefined> {
    console.log(`Buscando usuario por email: ${email}`);
    return this.userRepository.findOne({ where: { email } });
  }

  //BUSCAR TODOS LOS USUARIOS --------------------------------------------------------
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  //BUSCAR POR ID AL USUARIO ----------------------------------------------------------------
  async findOne(id: number): Promise<UserEntity | undefined> {
    console.log(`Buscando usuario por ID: ${id}`);
    return this.userRepository.findOne({ where: { id } });
  }
  //ACTUALIZAR AL USUARIO POR ID--------------------------------------------------------

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      console.log(
        `El usuario con ID: ${id} no se encuentra. Lanzando NotFoundException.`,
      );
      throw new NotFoundException(`El usuario con ID: ${id} no se encuentra.`);
    }

    // Actualizar solo los campos que se proporcionan en el DTO
    this.userRepository.merge(user, updateUserDto);

    try {
      // Guardar el usuario actualizado
      console.log('Guardando el usuario actualizado en la base de datos...');
      const updatedUser = await this.userRepository.save(user);
      console.log('Guardado exitoso, retorna...');

      return updatedUser;
    } catch (error) {
      // Manejar errores de base de datos
      console.error(
        `Fallo al actualizar el usuario por ID: ${id}. Error: ${error.message}`,
      );
      throw new Error(`Fallo al actualizar el usuario por ID: ${id}.`);
    }
  }
  //ELIMINAR AL USUARIO POR ID  --------------------------------------------------------

  async remove(id: string): Promise<void> {
    console.log(`Eliminando usuario por ID: ${id}`);
    await this.userRepository.delete(id);
    console.log('Usuario eliminado exitosamente.');
  }
}
