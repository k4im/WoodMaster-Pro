import { Test, TestingModule } from '@nestjs/testing';
import { CriarNovoClienteService } from './criar-novo-cliente.service';

describe('CriarNovoClienteService', () => {
  let service: CriarNovoClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriarNovoClienteService],
    }).compile();

    service = module.get<CriarNovoClienteService>(CriarNovoClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
