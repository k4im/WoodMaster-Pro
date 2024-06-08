import { Module } from "@nestjs/common";
import findTenantByUuidUsecase from "./commands/findTenant";
import { CustomLogger } from "src/infrastructure/logger/logger.service";
import { DatabaseMysqlAdapter } from "src/infrastructure/database/database.service";
import TenantRepository from "src/infrastructure/repository/Tenant/TenantRepository";
import listTenantsUseCase from "./commands/listTenants.usecase";
import createNewTenantUsecase from "./commands/createNewTenant.usecase";
import deactiveTenantUsecase from "./commands/deactivateTenant.usecase";
import AdmAuthService from "src/infrastructure/services/auth/admin/admin.auth.service";
import { JwtService } from "@nestjs/jwt";
import AdministratorRepository from "src/infrastructure/repository/Administrator/AdministratorRepository";
import AuthAdministratorUseCase from "./commands/authAdm.usecase";
import AuthAdminController from "src/application/http/routes/Administrator/controllers/auth.controller";
import FindTenantController from "src/application/http/routes/Administrator/controllers/findTenant.controller";
import ListTenantsController from "src/application/http/routes/Administrator/controllers/listTenants.controller";
import DeactivateTenantController from "src/application/http/routes/Administrator/controllers/deactivateTenant.controller";
import { CreateTenantController } from "src/application/http/routes/Administrator/controllers/createTenant.controller";

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
    {provide: "ITenantRepository", useClass: TenantRepository},
    {provide: 'AuthAbstracion', useClass: AdmAuthService},
    {provide: 'IJwtService', useClass: JwtService},
    {provide: 'IAdministratorRepository', useClass: AdministratorRepository},
    {provide: 'AuthUseCase', useClass: AuthAdministratorUseCase},
    {provide: 'AuthAbstraction', useClass: AdmAuthService}
]
})
export class AdministrativeUseCaseModule {}