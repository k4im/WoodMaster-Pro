import { Test, TestingModule } from '@nestjs/testing';
import { DeletarClienteService } from './deletar-cliente.service';

describe('DeletarClienteService', () => {
  let service: DeletarClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeletarClienteService],
    }).compile();

    service = module.get<DeletarClienteService>(DeletarClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
