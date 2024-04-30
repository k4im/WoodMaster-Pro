import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TenantRepositoryService } from 'src/infraestrutura/repository/tenant-repository/tenant-repository.service';
import { DatabaseService } from 'src/infraestrutura/database/database.service';
import { CustomLogger } from 'src/application/out-adapters/logger/logger.service';
import { Repository } from 'src/application/out-ports/Repository.gateway';

@Module({
  controllers: [TenantController],
  providers: [TenantService, {provide: Repository, useClass: TenantRepositoryService}, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService],
})
export class TenantModule {}
