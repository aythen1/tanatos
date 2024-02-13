import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { StoreFloristService } from '../service/store-florist.service';
import { CreateStoreFloristDto } from '../dto/create-store-florist.dto';

@Controller('store-florist')
export class StoreFloristController {
  constructor(private readonly storeFloristService: StoreFloristService) {}

  @Post(':userId')
  async create(
    @Body() createStoreFloristDto: CreateStoreFloristDto,
    @Param('userId') userId: number,
  ) {
    try {
      const createdStoreFlorist = await this.storeFloristService.create(
        createStoreFloristDto,
        userId,
      );
      return { success: true, data: createdStoreFlorist };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.storeFloristService.delete(id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number) {
    console.log('user');
    return await this.storeFloristService.findByUserId(userId);
  }

  @Get('search')
  async findByName(@Query('name') name: string) {
    return await this.storeFloristService.findByName(name);
  }
}
