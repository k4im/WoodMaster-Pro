import { Module } from "@nestjs/common";
import FindTenantController from "./controllers/findTenant.controller";
import findTenantByUuidUsecase from "./commands/findTenant";
import { CustomLogger } from "src/infrastructure/logger/logger.service";
import { DatabaseMysqlAdapter } from "src/infrastructure/database/database.service";
import TenantRepository from "src/infrastructure/repository/Tenant/TenantRepository";

@Module({
  controllers: [FindTenantController],
  providers: [
    {provide: "IFindTenant", useClass: findTenantByUuidUsecase},
    {provide: 'LoggerGateway', useClass: CustomLogger},
    {provide: 'DatabaseGateway', useClass: DatabaseMysqlAdapter},
    {provide: "ITenantRepository", useClass: TenantRepository}
]
})
export class AdministrativeUseCaseModule {}