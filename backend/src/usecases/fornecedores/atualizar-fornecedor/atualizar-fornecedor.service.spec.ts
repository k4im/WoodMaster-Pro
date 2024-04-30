import { Test, TestingModule } from '@nestjs/testing';
import { AtualizarFornecedorService } from './atualizar-fornecedor.service';

describe('AtualizarFornecedorService', () => {
  let service: AtualizarFornecedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtualizarFornecedorService],
    }).compile();

    service = module.get<AtualizarFornecedorService>(AtualizarFornecedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
