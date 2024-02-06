import { Test, TestingModule } from '@nestjs/testing';
import { TanatorioService } from './tanatorio.service';

describe('TanatorioService', () => {
  let service: TanatorioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TanatorioService],
    }).compile();

    service = module.get<TanatorioService>(TanatorioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
