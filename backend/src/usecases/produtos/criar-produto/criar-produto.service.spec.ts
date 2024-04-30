import { Test, TestingModule } from '@nestjs/testing';
import { CriarProdutoService } from './criar-produto.service';

describe('CriarProdutoService', () => {
  let service: CriarProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriarProdutoService],
    }).compile();

    service = module.get<CriarProdutoService>(CriarProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
