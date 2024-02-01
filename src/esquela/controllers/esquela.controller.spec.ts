import { Test, TestingModule } from '@nestjs/testing';
import { EsquelaController } from './esquela.controller';
import { EsquelaService } from './esquela.service';

describe('EsquelaController', () => {
  let controller: EsquelaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EsquelaController],
      providers: [EsquelaService],
    }).compile();

    controller = module.get<EsquelaController>(EsquelaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
