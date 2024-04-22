import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { Repository } from 'src/outbound/repository/Repository';
import { TenantRepositoryService } from 'src/outbound/repository/tenant-repository/tenant-repository.service';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';

@Module({
  controllers: [TenantController],
  providers: [TenantService, {provide: Repository, useClass: TenantRepositoryService}, CustomLogger, DatabaseService],
})
export class TenantModule {}
