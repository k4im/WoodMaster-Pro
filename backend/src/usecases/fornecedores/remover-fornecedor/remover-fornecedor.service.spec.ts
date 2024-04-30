import { Test, TestingModule } from '@nestjs/testing';
import { RemoverFornecedorService } from './remover-fornecedor.service';

describe('RemoverFornecedorService', () => {
  let service: RemoverFornecedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoverFornecedorService],
    }).compile();

    service = module.get<RemoverFornecedorService>(RemoverFornecedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
