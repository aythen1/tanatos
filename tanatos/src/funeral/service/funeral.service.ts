import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFuneralDto } from '../dto/create-funeral.dto';
import { UpdateFuneralDto } from '../dto/update-funeral.dto';
import { Funeral } from '../entities/funeral.entity';

@Injectable()
export class FuneralService {
  constructor(
    @InjectRepository(Funeral)
    private funeralRepository: Repository<Funeral>,
  ) {}

  async create(createFuneralDto: CreateFuneralDto) {
    const newFuneral = this.funeralRepository.create(createFuneralDto);
    return this.funeralRepository.save(newFuneral);
  }

  async findAll() {
    return this.funeralRepository.find();
  }

  async findOne(id: number) {
    const funeral = await this.funeralRepository.findOne({ where: { id } });
    if (!funeral) {
      throw new NotFoundException(`Funeral with id ${id} not found`);
    }
    return funeral;
  }

  async update(id: number, updateFuneralDto: UpdateFuneralDto) {
    const existingFuneral = await this.funeralRepository.findOne({
      where: { id },
    });
    if (!existingFuneral) {
      throw new NotFoundException(`Funeral with id ${id} not found`);
    }
    this.funeralRepository.merge(existingFuneral, updateFuneralDto);
    return this.funeralRepository.save(existingFuneral);
  }

  async remove(id: number) {
    const funeral = await this.findOne(id);
    return this.funeralRepository.remove(funeral);
  }
}
