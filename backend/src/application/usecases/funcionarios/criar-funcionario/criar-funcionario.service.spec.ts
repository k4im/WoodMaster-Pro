import { Test, TestingModule } from '@nestjs/testing';
import { CriarFuncionarioService } from './criar-funcionario.service';

describe('CriarFuncionarioService', () => {
  let service: CriarFuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriarFuncionarioService],
    }).compile();

    service = module.get<CriarFuncionarioService>(CriarFuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
