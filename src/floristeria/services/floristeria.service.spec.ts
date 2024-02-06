import { Test, TestingModule } from '@nestjs/testing';
import { FloristeriaService } from './floristeria.service';

describe('FloristeriaService', () => {
  let service: FloristeriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FloristeriaService],
    }).compile();

    service = module.get<FloristeriaService>(FloristeriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
