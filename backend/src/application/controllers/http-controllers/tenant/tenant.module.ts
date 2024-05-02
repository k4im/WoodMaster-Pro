import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TenantRepositoryService } from 'src/adapters/persistence/repository/tenant-repository/tenant-repository.service';
import { DatabaseService } from 'src/adapters/framework/database/database.service';
import { CustomLogger } from 'src/adapters/out-adapters/logger/logger.service';
import { Repository } from 'src/ports/out-ports/Repository.gateway';

@Module({
  controllers: [TenantController],
  providers: [TenantService, {provide: Repository, useClass: TenantRepositoryService}, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService],
})
export class TenantModule {}
