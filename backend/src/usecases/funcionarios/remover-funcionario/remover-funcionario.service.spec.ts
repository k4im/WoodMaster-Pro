import { Test, TestingModule } from '@nestjs/testing';
import { RemoverFuncionarioService } from './remover-funcionario.service';

describe('RemoverFuncionarioService', () => {
  let service: RemoverFuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoverFuncionarioService],
    }).compile();

    service = module.get<RemoverFuncionarioService>(RemoverFuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
