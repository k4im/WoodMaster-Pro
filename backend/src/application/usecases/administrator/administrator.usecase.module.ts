import { Module } from "@nestjs/common";
import findTenantByUuidUsecase from "./commands/findTenant";
import { CustomLogger } from "src/infrastructure/logger/logger.service";
import { DatabaseMysqlAdapter } from "src/infrastructure/database/database.service";
import TenantRepository from "src/infrastructure/repository/Tenant/TenantRepository";
import listTenantsUseCase from "./commands/listTenants.usecase";
import createNewTenantUsecase from "./commands/createNewTenant.usecase";
import deactiveTenantUsecase from "./commands/deactivateTenant.usecase";
import AdmAuthService from "src/infrastructure/services/auth/admin/admin.auth.service";
import AdministratorRepository from "src/infrastructure/repository/Administrator/AdministratorRepository";
import AuthAdministratorUseCase from "./commands/authAdm.usecase";
import AuthAdminController from "src/application/http/routes/Administrator/controllers/auth.controller";
import CaslModule from "src/application/casl/casl.module";
import JwtCustomService from "src/infrastructure/services/jwt/JwtService";
import CreateAdministratorUseCase from "./commands/createAdm.usecase";
import FindTenantController from "src/application/http/routes/Administrator/controllers/Tenants/findTenant.controller";
import ListTenantsController from "src/application/http/routes/Administrator/controllers/Tenants/listTenants.controller";
import DeactivateTenantController from "src/application/http/routes/Administrator/controllers/Tenants/deactivateTenant.controller";
import { CreateTenantController } from "src/application/http/routes/Administrator/controllers/Tenants/createTenant.controller";
import CreateAdministratorController from "src/application/http/routes/Administrator/controllers/Administrator/createAdministrator.controller";
import RoleService from "src/infrastructure/services/Role/role.service";
import reactiveTenantUsecase from "./commands/reactivateTenant.usecase";
import ReactivateTenantController from "src/application/http/routes/Administrator/controllers/Tenants/reactivateTenant.controller";

@Module({
  imports: [CaslModule],
  controllers:
    [
      AuthAdminController,
      FindTenantController,
      ListTenantsController,
      DeactivateTenantController,
      CreateTenantController,
      CreateAdministratorController,
      ReactivateTenantController
    ],

  providers: [
    { provide: "IFindTenant", useClass: findTenantByUuidUsecase },
    { provide: 'LoggerGateway', useClass: CustomLogger },
    { provide: 'DatabaseGateway', useClass: DatabaseMysqlAdapter },
    { provide: 'ListTenants', useClass: listTenantsUseCase },
    { provide: 'CreateTenant', useClass: createNewTenantUsecase },
    { provide: 'DeactivateTenant', useClass: deactiveTenantUsecase },
    { provide: "ITenantRepository", useClass: TenantRepository },
    { provide: 'AuthAbstracion', useClass: AdmAuthService },
    { provide: 'IJwtService', useClass: JwtCustomService },
    { provide: 'IAdministratorRepository', useClass: AdministratorRepository },
    { provide: 'AuthUseCase', useClass: AuthAdministratorUseCase },
    { provide: 'AuthAbstraction', useClass: AdmAuthService },
    { provide: 'ICreateAdmUseCase', useClass: CreateAdministratorUseCase },
    { provide: 'IAdminRepository', useClass: AdministratorRepository },
    { provide: 'IRoleService', useClass: RoleService },
    { provide: 'ReactivateTenant', useClass: reactiveTenantUsecase }
  ]
})
export class AdministrativeUseCaseModule { }