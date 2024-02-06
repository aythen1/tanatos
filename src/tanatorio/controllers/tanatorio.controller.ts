// src/controllers/tanatorios.controller.ts

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
} from '@nestjs/common';
import { TanatoriosService } from '../services/tanatorio.service';
import { CreateTanatorioDto } from '../dto/create-tanatorio.dto';
import { UpdateTanatorioDto } from '../dto/update-tanatorio.dto';

@Controller('tanatorios')
export class TanatoriosController {
  constructor(private readonly tanatoriosService: TanatoriosService) {}

  //BUSCAR TANATORIOS --------------------------------------------------------
  @Get()
  async findAll() {
    try {
      console.log('Obteniendo todos los tanatorios...');
      const tanatorios = await this.tanatoriosService.findAll();
      console.log('Tanatorios obtenidos exitosamente.');

      return tanatorios;
    } catch (error) {
      console.error('Error al obtener tanatorios:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //BUSCAR TANATORIO POR ID --------------------------------------------------------
  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      console.log(`Buscando tanatorio con ID: ${id}...`);
      const tanatorio = this.tanatoriosService.findOne(id);
      console.log('Tanatorio encontrado exitosamente:', tanatorio);

      return tanatorio;
    } catch (error) {
      console.error('Error al buscar tanatorio:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //CREAR TANATORIO --------------------------------------------------------
  @Post()
  async createTanatorio(@Body() createTanatorioDto: CreateTanatorioDto) {
    try {
      console.log('Creando un nuevo tanatorio...');
      const createdTanatorio =
        await this.tanatoriosService.createTanatorio(createTanatorioDto);
      console.log('Tanatorio creado exitosamente.');

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tanatorio creado exitosamente',
        data: createdTanatorio,
      };
    } catch (error) {
      console.error('Error al crear el tanatorio:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //ACTUALIZAR TANATORIO --------------------------------------------------------
  @Patch(':id')
  async updateTanatorio(
    @Param('id') id: number,
    @Body() updateTanatorioDto: UpdateTanatorioDto,
  ) {
    try {
      console.log(`Actualizando tanatorio con ID: ${id}...`);
      const updatedTanatorio = await this.tanatoriosService.updateTanatorio(
        id,
        updateTanatorioDto,
      );
      console.log('Tanatorio actualizado exitosamente:', updatedTanatorio);

      return {
        statusCode: HttpStatus.OK,
        message: 'Tanatorio actualizado exitosamente',
        data: updatedTanatorio,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Tanatorio no encontrado:', error);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        };
      } else {
        console.error('Error al actualizar tanatorio:', error);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        };
      }
    }
  }

  //ELIMINAR TANATORIO --------------------------------------------------------
  @Delete(':id')
  removeTanatorio(@Param('id') id: number) {
    try {
      console.log(`Eliminando tanatorio con ID: ${id}...`);
      const result = this.tanatoriosService.removeTanatorio(id);
      console.log('Tanatorio eliminado exitosamente.');

      return result;
    } catch (error) {
      console.error('Error al eliminar tanatorio:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }
}
