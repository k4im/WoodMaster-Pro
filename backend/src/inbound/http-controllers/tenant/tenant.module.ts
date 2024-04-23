import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { Repository } from 'src/outbound/repository/Repository';
import { TenantRepositoryService } from 'src/outbound/repository/tenant-repository/tenant-repository.service';
import { DatabaseService } from 'src/outbound/database/database.service';
import { CustomLogger } from 'src/outbound/logger/logger.service';

@Module({
  controllers: [TenantController],
  providers: [TenantService, {provide: Repository, useClass: TenantRepositoryService}, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService],
})
export class TenantModule {}
