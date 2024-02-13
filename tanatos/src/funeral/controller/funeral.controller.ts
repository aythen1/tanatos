import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateFuneralDto } from '../dto/create-funeral.dto';
import { UpdateFuneralDto } from '../dto/update-funeral.dto';
import { FuneralService } from '../service/funeral.service';

@Controller('funerals')
export class FuneralController {
  constructor(private readonly funeralService: FuneralService) {}

  @Post()
  async create(@Body() createFuneralDto: CreateFuneralDto) {
    return this.funeralService.create(createFuneralDto);
  }

  @Get()
  async findAll() {
    return this.funeralService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.funeralService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFuneralDto: UpdateFuneralDto,
  ) {
    return this.funeralService.update(+id, updateFuneralDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.funeralService.remove(+id);
  }
}
