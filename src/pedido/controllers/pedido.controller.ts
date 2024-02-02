// src/controllers/pedido.controller.ts
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
  BadRequestException,
} from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import { CreatePedidoDto } from '../dto/create-pedido.dto';
import { UpdatePedidoDto } from '../dto/update-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  //BUSCAR PEDIDOS --------------------------------------------------------
  @Get()
  async findAll() {
    try {
      console.log('Obteniendo todos los pedidos...');
      const pedidos = await this.pedidoService.findAll();
      console.log('Pedidos obtenidos exitosamente.');
      return pedidos;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //BUSCAR PEDIDO POR ID --------------------------------------------------------
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      console.log(`Buscando pedido con ID: ${id}...`);
      const pedido = await this.pedidoService.findOne(id);
      console.log('Pedido encontrado exitosamente:', pedido);
      return pedido;
    } catch (error) {
      console.error('Error al buscar pedido:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //CREAR PEDIDO --------------------------------------------------------
  @Post()
  async createPedido(@Body() createPedidoDto: CreatePedidoDto) {
    try {
      console.log('Creando un nuevo pedido...');
      const createdPedido =
        await this.pedidoService.createPedido(createPedidoDto);
      console.log('Pedido creado exitosamente.');
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Pedido created successfully',
        data: createdPedido,
      };
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //ACTUALIZAR PEDIDO --------------------------------------------------------
  @Patch(':id')
  async updatePedido(
    @Param('id') id: number,
    @Body() updatePedidoDto: UpdatePedidoDto,
  ) {
    try {
      console.log(`Actualizando pedido con ID: ${id}...`);
      const updatedPedido = await this.pedidoService.updatePedido(
        id,
        updatePedidoDto,
      );
      console.log('Pedido actualizado exitosamente:', updatedPedido);
      return {
        statusCode: HttpStatus.OK,
        message: 'Pedido updated successfully',
        data: updatedPedido,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        console.error('Error al actualizar pedido:', error);
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message,
        };
      } else {
        console.error('Error al actualizar pedido:', error);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        };
      }
    }
  }

  //ELIMINAR PEDIDO --------------------------------------------------------
  @Delete(':id')
  async removePedido(@Param('id') id: number) {
    try {
      console.log(`Eliminando pedido con ID: ${id}...`);
      const result = await this.pedidoService.removePedido(id);
      console.log('Pedido eliminado exitosamente.');
      return result;
    } catch (error) {
      console.error('Error al eliminar pedido:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }
}
