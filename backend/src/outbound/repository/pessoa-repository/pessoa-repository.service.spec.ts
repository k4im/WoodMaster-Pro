import { Test, TestingModule } from '@nestjs/testing';
import { PessoaRepositoryService } from './pessoa-repository.service';

describe('PessoaRepositoryService', () => {
  let service: PessoaRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PessoaRepositoryService],
    }).compile();

    service = module.get<PessoaRepositoryService>(PessoaRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
