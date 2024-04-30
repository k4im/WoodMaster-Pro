import { Test, TestingModule } from '@nestjs/testing';
import { CriarFornecedorService } from './criar-fornecedor.service';

describe('CriarFornecedorService', () => {
  let service: CriarFornecedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriarFornecedorService],
    }).compile();

    service = module.get<CriarFornecedorService>(CriarFornecedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
