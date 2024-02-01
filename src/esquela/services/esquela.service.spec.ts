import { Test, TestingModule } from '@nestjs/testing';
import { EsquelaService } from './esquela.service';

describe('EsquelaService', () => {
  let service: EsquelaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EsquelaService],
    }).compile();

    service = module.get<EsquelaService>(EsquelaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
