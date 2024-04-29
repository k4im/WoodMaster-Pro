import { Test, TestingModule } from '@nestjs/testing';
import { ListarClientesService } from './listar-clientes.service';

describe('ListarClientesService', () => {
  let service: ListarClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListarClientesService],
    }).compile();

    service = module.get<ListarClientesService>(ListarClientesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
