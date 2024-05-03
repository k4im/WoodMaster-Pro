import { Test, TestingModule } from '@nestjs/testing';
import { CreateNewTenantService } from './create-new-tenant.service';

describe('CreateNewTenantService', () => {
  let service: CreateNewTenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateNewTenantService],
    }).compile();

    service = module.get<CreateNewTenantService>(CreateNewTenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
