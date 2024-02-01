// src/controllers/esquelas.controller.ts

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
import { EsquelasService } from '../services/esquela.service';
import { CreateEsquelaDto } from '../dto/create-esquela.dto';
import { UpdateEsquelaDto } from '../dto/update-esquela.dto';

@Controller('esquelas')
export class EsquelasController {
  constructor(private readonly esquelasService: EsquelasService) {}

  //BUSCAR TODAS LAS ESQUELAS --------------------------------------------------------
  @Get()
  async findAll() {
    try {
      console.log('Obteniendo todas las esquelas...');
      const esquelas = await this.esquelasService.findAll();
      console.log('Esquelas obtenidas exitosamente.');

      return esquelas;
    } catch (error) {
      console.error('Error al obtener esquelas:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //BUSCAR ESQUELA POR ID --------------------------------------------------------
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      console.log(`Buscando esquela con ID: ${id}...`);
      const esquela = await this.esquelasService.findOne(id); // Añadir "await" aquí
      console.log('Esquela encontrada exitosamente:', esquela);

      return esquela;
    } catch (error) {
      console.error('Error al buscar esquela:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //CREAR ESQUELA --------------------------------------------------------

  @Post()
  async createEsquela(@Body() createEsquelaDto: CreateEsquelaDto) {
    try {
      console.log('Creando una nueva esquela...');
      const createdEsquela =
        await this.esquelasService.createEsquela(createEsquelaDto);
      console.log('Esquela creada exitosamente.');

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Esquela created successfully',
        data: createdEsquela,
      };
    } catch (error) {
      console.error('Error al crear la esquela:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //ACTUALIZAR ESQUELA POR ID --------------------------------------------------------

  @Patch(':id')
  async updateEsquela(
    @Param('id') id: number,
    @Body() updateEsquelaDto: UpdateEsquelaDto,
  ) {
    try {
      console.log(`Actualizando esquela con ID: ${id}...`);
      const updatedEsquela = await this.esquelasService.updateEsquela(
        id,
        updateEsquelaDto,
      );
      console.log('Esquela actualizada exitosamente:', updatedEsquela);

      return {
        statusCode: HttpStatus.OK,
        message: 'Esquela updated successfully',
        data: updatedEsquela,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Esquela no encontrada:', error);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        };
      } else {
        console.error('Error al actualizar esquela:', error);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        };
      }
    }
  }

  //ELIMINAR ESQUELA POR ID --------------------------------------------------------
  @Delete(':id')
  removeEsquela(@Param('id') id: number) {
    try {
      console.log(`Eliminando esquela con ID: ${id}...`);
      const result = this.esquelasService.removeEsquela(id);
      console.log('Esquela eliminada exitosamente.');

      return result;
    } catch (error) {
      console.error('Error al eliminar esquela:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }
}
