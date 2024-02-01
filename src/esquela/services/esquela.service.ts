// src/services/esquelas.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EsquelaEntity } from '../entities/esquela.entity';
import { CreateEsquelaDto } from '../dto/create-esquela.dto';
import { UpdateEsquelaDto } from '../dto/update-esquela.dto';
import { Repository, FindOneOptions } from 'typeorm';

@Injectable()
export class EsquelasService {
  constructor(
    @InjectRepository(EsquelaEntity)
    private readonly esquelaRepository: Repository<EsquelaEntity>,
  ) {}

  //BUSCAR TODAS LAS ESQUELAS --------------------------------------------------------
  async findAll(): Promise<EsquelaEntity[]> {
    console.log('Buscando todas las esquelas...');
    const esquelas = await this.esquelaRepository.find();
    console.log('Esquelas encontradas:', esquelas);
    return esquelas;
  }

  //BUSCAR ESQUELA POR ID --------------------------------------------------------

  async findOne(id: number): Promise<EsquelaEntity | undefined> {
    console.log(`Buscando esquela por ID: ${id}...`);
    const esquela = await this.esquelaRepository.findOne({
      where: { id },
    } as FindOneOptions<EsquelaEntity>);
    console.log('Esquela encontrada:', esquela);
    return esquela;
  }

  //CREAR ESQUELA --------------------------------------------------------

  async createEsquela(
    createEsquelaDto: CreateEsquelaDto,
  ): Promise<EsquelaEntity> {
    console.log('Creando nueva esquela...');
    const newEsquela = this.esquelaRepository.create(createEsquelaDto);
    const savedEsquela = await this.esquelaRepository.save(newEsquela);
    console.log('Esquela creada exitosamente:', savedEsquela);
    return savedEsquela;
  }

  //ACTUALIZAR ESQUELA --------------------------------------------------------

  async updateEsquela(
    id: number,
    updateEsquelaDto: UpdateEsquelaDto,
  ): Promise<EsquelaEntity> {
    console.log(`Actualizando esquela con ID: ${id}...`);
    const esquela = await this.esquelaRepository.findOne({
      where: { id },
    } as FindOneOptions<EsquelaEntity>);
    if (!esquela) {
      console.log(
        `Esquela con ID ${id} no encontrada. Lanzando NotFoundException.`,
      );
      throw new NotFoundException(`La esquela con ID ${id} no se encuentra.`);
    }

    this.esquelaRepository.merge(esquela, updateEsquelaDto);

    const updatedEsquela = await this.esquelaRepository.save(esquela);
    console.log('Esquela actualizada exitosamente:', updatedEsquela);
    return updatedEsquela;
  }

  //ELIMINAR ESQUELA --------------------------------------------------------

  async removeEsquela(id: number): Promise<void> {
    console.log(`Eliminando esquela con ID: ${id}...`);
    const esquela = await this.esquelaRepository.findOne({
      where: { id },
    } as FindOneOptions<EsquelaEntity>);
    if (!esquela) {
      console.log(
        `Esquela con ID ${id} no encontrada. Lanzando NotFoundException.`,
      );
      throw new NotFoundException(`La esquela con ID ${id} no se encuentra.`);
    }

    await this.esquelaRepository.remove(esquela);
    console.log('Esquela eliminada exitosamente.');
  }
}
