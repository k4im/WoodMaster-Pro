import { Test, TestingModule } from '@nestjs/testing';
import { AtualizarFuncionarioService } from './atualizar-funcionario.service';

describe('AtualizarFuncionarioService', () => {
  let service: AtualizarFuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtualizarFuncionarioService],
    }).compile();

    service = module.get<AtualizarFuncionarioService>(AtualizarFuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
