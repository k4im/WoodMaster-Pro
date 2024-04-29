import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TenantRepositoryService } from 'src/outbound/adapters/repository/tenant-repository/tenant-repository.service';
import { CustomLogger } from 'src/outbound/adapters/logger/logger.service';
import { DatabaseService } from 'src/outbound/adapters/database/database.service';
import { Repository } from 'src/outbound/ports/Repository.gateway';

@Module({
  controllers: [TenantController],
  providers: [TenantService, {provide: Repository, useClass: TenantRepositoryService}, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService],
})
export class TenantModule {}
