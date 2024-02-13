import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreFlorist } from '../entities/store-florist.entity';
import { Usuario } from '../../user-type/entities/user-type.entity';
import { CreateStoreFloristDto } from '../dto/create-store-florist.dto';

@Injectable()
export class StoreFloristService {
  constructor(
    @InjectRepository(StoreFlorist)
    private readonly storeFloristRepository: Repository<StoreFlorist>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(
    createStoreFloristDTO: CreateStoreFloristDto,
    userId: number,
  ): Promise<StoreFlorist> {
    const user = await this.usuarioRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(
        `El usuario con ID ${userId} no fue encontrado.`,
      );
    }

    const storeFlorist = new StoreFlorist();
    storeFlorist.phone = createStoreFloristDTO.phone;
    storeFlorist.location = createStoreFloristDTO.location;
    storeFlorist.lat = createStoreFloristDTO.lat;
    storeFlorist.lng = createStoreFloristDTO.lng;
    storeFlorist.name = createStoreFloristDTO.name;
    storeFlorist.usuario = user;

    return await this.storeFloristRepository.save(storeFlorist);
  }

  async delete(id: number): Promise<void> {
    const result = await this.storeFloristRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`La tienda florista con id ${id} no existe.`);
    }
  }

  async findByUserId(userId: number): Promise<StoreFlorist[]> {
    console.log('PASA POR ACA');
    return await this.storeFloristRepository.find({
      where: { usuario: { id: userId } },
    });
  }

  async findByName(name: string): Promise<StoreFlorist[]> {
    return await this.storeFloristRepository.find({ where: { name: name } });
  }
}
