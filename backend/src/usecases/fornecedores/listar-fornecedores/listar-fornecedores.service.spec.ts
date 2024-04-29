import { Test, TestingModule } from '@nestjs/testing';
import { ListarFornecedoresService } from './listar-fornecedores.service';

describe('ListarFornecedoresService', () => {
  let service: ListarFornecedoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListarFornecedoresService],
    }).compile();

    service = module.get<ListarFornecedoresService>(ListarFornecedoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
