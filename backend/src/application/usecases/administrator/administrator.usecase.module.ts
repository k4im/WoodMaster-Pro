import { Module } from "@nestjs/common";
import FindTenantController from "./controllers/findTenant.controller";
import findTenantByUuidUsecase from "./commands/findTenant";
import { CustomLogger } from "src/infrastructure/logger/logger.service";
import { DatabaseMysqlAdapter } from "src/infrastructure/database/database.service";
import TenantRepository from "src/infrastructure/repository/Tenant/TenantRepository";
import ListTenantsController from "./controllers/listTenants.controller";
import listTenantsUseCase from "./commands/listTenants.usecase";
import createNewTenantUsecase from "./commands/createNewTenant.usecase";
import { CreateTenantController } from "./controllers/createTenant.controller";
import deactiveTenantUsecase from "./commands/deactivateTenant.usecase";
import DeactivateTenantController from "./controllers/deactivateTenant.controller";
import AuthAdminController from "./controllers/auth.controller";

@Module({
  controllers: [
    AuthAdminController,
    FindTenantController, 
    ListTenantsController, 
    DeactivateTenantController, 
    CreateTenantController,],
  providers: [
    {provide: "IFindTenant", useClass: findTenantByUuidUsecase},
    {provide: 'LoggerGateway', useClass: CustomLogger},
    {provide: 'DatabaseGateway', useClass: DatabaseMysqlAdapter},
    {provide: 'ListTenants', useClass: listTenantsUseCase},
    {provide: 'CreateTenant', useClass: createNewTenantUsecase},
    {provide: 'DeactivateTenant', useClass: deactiveTenantUsecase},
    {provide: "ITenantRepository", useClass: TenantRepository}
]
})
export class AdministrativeUseCaseModule {}