import { Test, TestingModule } from '@nestjs/testing';
import { ListTenantsService } from './list-tenants.service';

describe('ListTenantsService', () => {
  let service: ListTenantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListTenantsService],
    }).compile();

    service = module.get<ListTenantsService>(ListTenantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
