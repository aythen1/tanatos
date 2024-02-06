import { Test, TestingModule } from '@nestjs/testing';
import { TanatorioController } from './tanatorio.controller';
import { TanatorioService } from '../services/tanatorio.service';

describe('TanatorioController', () => {
  let controller: TanatorioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TanatorioController],
      providers: [TanatorioService],
    }).compile();

    controller = module.get<TanatorioController>(TanatorioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
