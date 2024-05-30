import { Module } from "@nestjs/common";
import TenantLoginController from "./controllers/tenantLogin.controler";
import AuthUseCase from "./commands/auth.usecase";
import { DatabaseMysqlAdapter } from "src/infrastructure/database/database.service";
import { CustomLogger } from "src/infrastructure/logger/logger.service";
import AuthService from "src/infrastructure/services/auth/auth.service";
import TenantRepository from "src/infrastructure/repository/Tenant/TenantRepository";
import UserRepository from "src/infrastructure/repository/User/UserRepository";
import JwtCustomService from "src/infrastructure/services/jwt/JwtService";
import RoleService from "src/infrastructure/services/Role/role.service";

@Module({
    controllers: [TenantLoginController],
    providers: [
        {provide: 'LoggerGateway', useClass: CustomLogger},
        {provide: 'DatabaseGateway', useClass: DatabaseMysqlAdapter},
        {provide: "IAuthCommand", useClass: AuthUseCase},
        {provide: "AuthAbstraction", useClass: AuthService},
        {provide: 'ITenantRepository', useClass: TenantRepository},
        {provide: 'IUserRepository', useClass: UserRepository},
        {provide: 'IJwtService', useClass: JwtCustomService},
        {provide: 'RoleService', useClass: RoleService}
    ]
})
export default class AuthUseCaseModule {}