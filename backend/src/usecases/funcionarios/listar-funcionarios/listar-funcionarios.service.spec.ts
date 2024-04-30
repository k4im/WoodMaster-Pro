import { Test, TestingModule } from '@nestjs/testing';
import { ListarFuncionariosService } from './listar-funcionarios.service';

describe('ListarFuncionariosService', () => {
  let service: ListarFuncionariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListarFuncionariosService],
    }).compile();

    service = module.get<ListarFuncionariosService>(ListarFuncionariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
