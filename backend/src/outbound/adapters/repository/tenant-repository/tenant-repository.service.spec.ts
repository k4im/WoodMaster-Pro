import { Test, TestingModule } from '@nestjs/testing';
import { TenantRepositoryService } from './tenant-repository.service';

describe('TenantRepositoryService', () => {
  let service: TenantRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TenantRepositoryService],
    }).compile();

    service = module.get<TenantRepositoryService>(TenantRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
