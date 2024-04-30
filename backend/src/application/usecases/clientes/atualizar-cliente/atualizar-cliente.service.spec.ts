import { Test, TestingModule } from '@nestjs/testing';
import { AtualizarClienteService } from './atualizar-cliente.service';

describe('AtualizarClienteService', () => {
  let service: AtualizarClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtualizarClienteService],
    }).compile();

    service = module.get<AtualizarClienteService>(AtualizarClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
