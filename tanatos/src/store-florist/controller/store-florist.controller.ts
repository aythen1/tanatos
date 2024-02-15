import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { StoreFloristService } from '../service/store-florist.service';
import { CreateStoreFloristDto } from '../dto/create-store-florist.dto';

@Controller('store-florist')
export class StoreFloristController {
  constructor(private readonly storeFloristService: StoreFloristService) {}

  @Post(':userId')
  async create(
    @Body() createStoreFloristDto: CreateStoreFloristDto,
    @Param('userId', ParseIntPipe) userId: number,
    @Body('name') name: string, // Agrega la propiedad name recibida del front-end
    @Body('location') location: string, // Agrega la propiedad location recibida del front-end
    @Body('lng') lng: number, // Agrega la propiedad name recibida del front-end
    @Body('lat') lat: number, // Agrega la propiedad location recibida del front-end
  ) {
    return this.storeFloristService.create(
      createStoreFloristDto,
      userId,
      name,
      location,
      lng,
      lat,
    );
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
