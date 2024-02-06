// src/services/floristerias.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FloristeriaEntity } from '../entities/floristeria.entity';
import { CreateFloristeriaDto } from '../dto/create-floristeria.dto';
import { UpdateFloristeriaDto } from '../dto/update-floristeria.dto';

@Injectable()
export class FloristeriasService {
  constructor(
    @InjectRepository(FloristeriaEntity)
    private readonly floristeriaRepository: Repository<FloristeriaEntity>,
  ) {}

  // BUSCAR TANATORIOS --------------------------------------------------------
  async findAll(): Promise<FloristeriaEntity[]> {
    try {
      console.log('Buscando todas las floristerías...');
      const floristerias = await this.floristeriaRepository.find();
      console.log('Floristerías encontradas:', floristerias);
      return floristerias;
    } catch (error) {
      console.error('Error al obtener floristerías:', error);
      throw new Error('Error al obtener floristerías');
    }
  }

  // BUSCAR TANATORIO POR ID --------------------------------------------------------
  async findOne(id: number): Promise<FloristeriaEntity | undefined> {
    try {
      console.log(`Buscando floristería por ID: ${id}...`);
      const floristeria = await this.floristeriaRepository.findOne({
        where: { id },
      });
      console.log('Floristería encontrada:', floristeria);
      return floristeria;
    } catch (error) {
      console.error('Error al buscar floristería:', error);
      throw new NotFoundException('Floristería no encontrada');
    }
  }

  // CREAR TANATORIO --------------------------------------------------------
  async createFloristeria(
    createFloristeriaDto: CreateFloristeriaDto,
  ): Promise<FloristeriaEntity> {
    try {
      console.log('Creando nueva floristería...');
      const newFloristeria =
        this.floristeriaRepository.create(createFloristeriaDto);
      const savedFloristeria =
        await this.floristeriaRepository.save(newFloristeria);
      console.log('Floristería creada exitosamente:', savedFloristeria);
      return savedFloristeria;
    } catch (error) {
      console.error('Error al crear la floristería:', error);
      throw new Error('Error al crear la floristería');
    }
  }

  // ACTUALIZAR TANATORIO --------------------------------------------------------
  async updateFloristeria(
    id: number,
    updateFloristeriaDto: UpdateFloristeriaDto,
  ): Promise<FloristeriaEntity> {
    try {
      console.log(`Actualizando floristería con ID: ${id}...`);
      const floristeria = await this.floristeriaRepository.findOne({
        where: { id },
      });

      if (!floristeria) {
        console.log(
          `Floristería con ID ${id} no encontrada. Lanzando NotFoundException.`,
        );
        throw new NotFoundException(
          `La floristería con ID ${id} no se encuentra.`,
        );
      }

      this.floristeriaRepository.merge(floristeria, updateFloristeriaDto);

      const updatedFloristeria =
        await this.floristeriaRepository.save(floristeria);
      console.log('Floristería actualizada exitosamente:', updatedFloristeria);
      return updatedFloristeria;
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Floristería no encontrada:', error);
        throw error;
      } else {
        console.error('Error al actualizar floristería:', error);
        throw new Error('Error al actualizar floristería');
      }
    }
  }

  // ELIMINAR TANATORIO --------------------------------------------------------
  async removeFloristeria(id: number): Promise<void> {
    try {
      console.log(`Eliminando floristería con ID: ${id}...`);
      const floristeria = await this.floristeriaRepository.findOne({
        where: { id },
      });

      if (!floristeria) {
        console.log(
          `Floristería con ID ${id} no encontrada. Lanzando NotFoundException.`,
        );
        throw new NotFoundException(
          `La floristería con ID ${id} no se encuentra.`,
        );
      }

      await this.floristeriaRepository.remove(floristeria);
      console.log('Floristería eliminada exitosamente.');
    } catch (error) {
      console.error('Error al eliminar floristería:', error);
      throw new Error('Error al eliminar floristería');
    }
  }
}
