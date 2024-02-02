// src/services/pedido.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoEntity } from '../entities/pedido.entity';

import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
  ) {}

  //BUSCAR PEDIDOS --------------------------------------------------------
  async findAll(): Promise<PedidoEntity[]> {
    try {
      console.log('Buscando todos los pedidos...');
      const pedidos = await this.pedidoRepository.find();
      console.log('Pedidos encontrados:', pedidos);
      return pedidos;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      throw new Error('Error al obtener pedidos');
    }
  }

  //BUSCAR PEDIDO POR ID --------------------------------------------------------
  async findOne(id: number): Promise<PedidoEntity | undefined> {
    try {
      console.log(`Buscando pedido por ID: ${id}...`);
      const pedido = await this.pedidoRepository.findOne({
        where: { id },
      });
      console.log('Pedido encontrado:', pedido);
      return pedido;
    } catch (error) {
      console.error('Error al buscar pedido:', error);
      throw new Error('Error al buscar pedido');
    }
  }

  //CREAR PEDIDO --------------------------------------------------------
  async createPedido(createPedidoDto: CreatePedidoDto): Promise<PedidoEntity> {
    try {
      console.log('Creando nuevo pedido...');
      const newPedido = this.pedidoRepository.create(createPedidoDto);
      const savedPedido = await this.pedidoRepository.save(newPedido);
      console.log('Pedido creado exitosamente:', savedPedido);
      return savedPedido;
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      throw new Error('Error al crear el pedido');
    }
  }

  //ACTUALIZAR PEDIDO --------------------------------------------------------
  async updatePedido(
    id: number,
    updatePedidoDto: UpdatePedidoDto,
  ): Promise<PedidoEntity> {
    try {
      console.log(`Actualizando pedido con ID: ${id}...`);
      const pedido = await this.pedidoRepository.findOne({
        where: { id },
      });
      if (!pedido) {
        console.log(
          `Pedido con ID ${id} no encontrado. Lanzando NotFoundException.`,
        );
        throw new NotFoundException(`El pedido con ID ${id} no se encuentra.`);
      }

      if (
        updatePedidoDto.state &&
        updatePedidoDto.state === 'cancelado' &&
        pedido.state !== 'solicitado'
      ) {
        console.log(
          'Error: No se puede cancelar un pedido que no está en estado "solicitado".',
        );
        throw new BadRequestException(
          'No se puede cancelar un pedido que no está en estado "solicitado".',
        );
      }

      this.pedidoRepository.merge(pedido, updatePedidoDto);

      const updatedPedido = await this.pedidoRepository.save(pedido);
      console.log('Pedido actualizado exitosamente:', updatedPedido);
      return updatedPedido;
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new Error('Error al actualizar pedido');
      }
    }
  }

  //ELIMINAR PEDIDO --------------------------------------------------------
  async removePedido(id: number): Promise<void> {
    try {
      console.log(`Eliminando pedido con ID: ${id}...`);
      const pedido = await this.pedidoRepository.findOne({
        where: { id },
      });
      if (!pedido) {
        console.log(
          `Pedido con ID ${id} no encontrado. Lanzando NotFoundException.`,
        );
        throw new NotFoundException(`El pedido con ID ${id} no se encuentra.`);
      }

      await this.pedidoRepository.remove(pedido);
      console.log('Pedido eliminado exitosamente.');
    } catch (error) {
      console.error('Error al eliminar pedido:', error);
      throw new Error('Error al eliminar pedido');
    }
  }
}
