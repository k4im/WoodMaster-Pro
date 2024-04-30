import { Test, TestingModule } from '@nestjs/testing';
import { ListarEstabelecimentosUseCaseService } from './listar-estabelecimentos-use-case.service';

describe('ListarEstabelecimentosUseCaseService', () => {
  let service: ListarEstabelecimentosUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListarEstabelecimentosUseCaseService],
    }).compile();

    service = module.get<ListarEstabelecimentosUseCaseService>(ListarEstabelecimentosUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
