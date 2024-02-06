// src/controllers/floristerias.controller.ts

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
import { FloristeriasService } from '../services/floristeria.service';
import { CreateFloristeriaDto } from '../dto/create-floristeria.dto';
import { UpdateFloristeriaDto } from '../dto/update-floristeria.dto';

@Controller('floristerias')
export class FloristeriasController {
  constructor(private readonly floristeriasService: FloristeriasService) {}

  //BUSCAR TANATORIOS --------------------------------------------------------
  @Get()
  async findAll() {
    try {
      console.log('Obteniendo todas las floristerías...');
      const floristerias = await this.floristeriasService.findAll();
      console.log('Floristerías obtenidas exitosamente.');

      return floristerias;
    } catch (error) {
      console.error('Error al obtener floristerías:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //BUSCAR TANATORIO POR ID --------------------------------------------------------
  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      console.log(`Buscando floristería con ID: ${id}...`);
      const floristeria = await this.floristeriasService.findOne(id); // Convertir a número
      console.log('Floristería encontrada exitosamente:', floristeria);

      return floristeria;
    } catch (error) {
      console.error('Error al buscar floristería:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //CREAR TANATORIO --------------------------------------------------------
  @Post()
  async createFloristeria(@Body() createFloristeriaDto: CreateFloristeriaDto) {
    try {
      console.log('Creando una nueva floristería...');
      const createdFloristeria =
        await this.floristeriasService.createFloristeria(createFloristeriaDto);
      console.log('Floristería creada exitosamente.');

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Floristería creada exitosamente',
        data: createdFloristeria,
      };
    } catch (error) {
      console.error('Error al crear la floristería:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  //ACTUALIZAR TANATORIO --------------------------------------------------------
  @Patch(':id')
  async updateFloristeria(
    @Param('id') id: number,
    @Body() updateFloristeriaDto: UpdateFloristeriaDto,
  ) {
    try {
      console.log(`Actualizando floristería con ID: ${id}...`);
      const updatedFloristeria =
        await this.floristeriasService.updateFloristeria(
          id,
          updateFloristeriaDto,
        );
      console.log('Floristería actualizada exitosamente:', updatedFloristeria);

      return {
        statusCode: HttpStatus.OK,
        message: 'Floristería actualizada exitosamente',
        data: updatedFloristeria,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Floristería no encontrada:', error);
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: error.message,
        };
      } else {
        console.error('Error al actualizar floristería:', error);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        };
      }
    }
  }

  //ELIMINAR TANATORIO --------------------------------------------------------
  @Delete(':id')
  async removeFloristeria(@Param('id') id: number) {
    try {
      console.log(`Eliminando floristería con ID: ${id}...`);
      const result = this.floristeriasService.removeFloristeria(id);
      console.log('Floristería eliminada exitosamente.');

      return result;
    } catch (error) {
      console.error('Error al eliminar floristería:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }
}
