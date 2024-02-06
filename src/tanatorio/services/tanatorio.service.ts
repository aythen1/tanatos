// src/services/tanatorios.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TanatorioEntity } from '../entities/tanatorio.entity';
import { CreateTanatorioDto } from '../dto/create-tanatorio.dto';
import { UpdateTanatorioDto } from '../dto/update-tanatorio.dto';

@Injectable()
export class TanatoriosService {
  constructor(
    @InjectRepository(TanatorioEntity)
    private readonly tanatorioRepository: Repository<TanatorioEntity>,
  ) {}

  // BUSCAR TANATORIOS --------------------------------------------------------
  async findAll(): Promise<TanatorioEntity[]> {
    console.log('Buscando todos los tanatorios...');
    const tanatorios = await this.tanatorioRepository.find();
    console.log('Tanatorios encontrados:', tanatorios);
    return tanatorios;
  }

  //BUSCAR TANATORIO POR ID --------------------------------------------------------
  async findOne(id: number): Promise<TanatorioEntity | undefined> {
    console.log(`Buscando tanatorio por ID: ${id}...`);
    const tanatorio = await this.tanatorioRepository.findOne({
      where: { id },
    });
    console.log('Tanatorio encontrado:', tanatorio);
    return tanatorio;
  }

  // CREAR TANATORIO --------------------------------------------------------
  async createTanatorio(
    createTanatorioDto: CreateTanatorioDto,
  ): Promise<TanatorioEntity> {
    console.log('Creando nuevo tanatorio...');
    const newTanatorio = this.tanatorioRepository.create(createTanatorioDto);
    const savedTanatorio = await this.tanatorioRepository.save(newTanatorio);
    console.log('Tanatorio creado exitosamente:', savedTanatorio);
    return savedTanatorio;
  }

  // ACTUALIZAR TANATORIO --------------------------------------------------------
  async updateTanatorio(
    id: number,
    updateTanatorioDto: UpdateTanatorioDto,
  ): Promise<TanatorioEntity> {
    console.log(`Actualizando tanatorio con ID: ${id}...`);
    const tanatorio = await this.tanatorioRepository.findOne({
      where: { id },
    });

    if (!tanatorio) {
      console.log(
        `Tanatorio con ID ${id} no encontrado. Lanzando NotFoundException.`,
      );
      throw new NotFoundException(`El tanatorio con ID ${id} no se encuentra.`);
    }

    this.tanatorioRepository.merge(tanatorio, updateTanatorioDto);

    const updatedTanatorio = await this.tanatorioRepository.save(tanatorio);
    console.log('Tanatorio actualizado exitosamente:', updatedTanatorio);
    return updatedTanatorio;
  }

  // ELIMINAR TANATORIO --------------------------------------------------------
  async removeTanatorio(id: number): Promise<void> {
    console.log(`Eliminando tanatorio con ID: ${id}...`);
    const tanatorio = await this.tanatorioRepository.findOne({
      where: { id },
    });

    if (!tanatorio) {
      console.log(
        `Tanatorio con ID ${id} no encontrado. Lanzando NotFoundException.`,
      );
      throw new NotFoundException(`El tanatorio con ID ${id} no se encuentra.`);
    }

    await this.tanatorioRepository.remove(tanatorio);
    console.log('Tanatorio eliminado exitosamente.');
  }
}
