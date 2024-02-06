import { Test, TestingModule } from '@nestjs/testing';
import { FloristeriaController } from './floristeria.controller';
import { FloristeriaService } from '../services/floristeria.service';

describe('FloristeriaController', () => {
  let controller: FloristeriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FloristeriaController],
      providers: [FloristeriaService],
    }).compile();

    controller = module.get<FloristeriaController>(FloristeriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
