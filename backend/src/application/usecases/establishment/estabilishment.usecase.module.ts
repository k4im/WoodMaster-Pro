import { Module } from "@nestjs/common";
import { DatabaseMysqlAdapter } from "src/infrastructure/database/database.service";
import { CustomLogger } from "src/infrastructure/logger/logger.service";
import AuthUseCase from "./commands/authentication/auth.usecase";
import AuthService from "src/infrastructure/services/auth/auth.service";
import TenantRepository from "src/infrastructure/repository/Tenant/TenantRepository";
import UserRepository from "src/infrastructure/repository/User/UserRepository";
import JwtCustomService from "src/infrastructure/services/jwt/JwtService";
import RoleService from "src/infrastructure/services/Role/role.service";
import EstablishmentLoginController from "./controllers/EstablishmentLogin.controler";
import PaginateCollaboratorsUseCase from "./commands/Collaborators/paginateCollaborator.usecae";
import PersonRepository from "src/infrastructure/repository/Person/PersonRepository";
import createCollaboratorUseCase from "./commands/Collaborators/createCollaborator.usecase";
import ListCollaboratorsController from "./controllers/collaborators/listCollaborators.controller";
import CreateCollaboratorController from "./controllers/collaborators/CreateCollaborator.controller";
import FindCollaboratorController from "./controllers/collaborators/FindCollaborator.controller";
import findCollaboratorUseCase from "./commands/Collaborators/findCollaborator.usecase";
import UpdateCollaboratorController from "./controllers/collaborators/updateCollaborator.controller";
import updateCollaboratorUseCase from "./commands/Collaborators/updateCollaborator.usecase";
import deactivateCollaboratorUseCase from "./commands/Collaborators/deactivateCollaborator.usecase";

@Module({
    controllers: [
        EstablishmentLoginController, ListCollaboratorsController,
        CreateCollaboratorController, FindCollaboratorController,
        UpdateCollaboratorController],
    providers: [        
        {provide: 'LoggerGateway', useClass: CustomLogger},
        {provide: 'DatabaseGateway', useClass: DatabaseMysqlAdapter},
        {provide: "IAuthCommand", useClass: AuthUseCase},
        {provide: "AuthAbstraction", useClass: AuthService},
        {provide: 'ITenantRepository', useClass: TenantRepository},
        {provide: 'IUserRepository', useClass: UserRepository},
        {provide: 'IJwtService', useClass: JwtCustomService},
        {provide: 'RoleService', useClass: RoleService},
        {provide: 'listCollaborators', useClass: PaginateCollaboratorsUseCase},
        {provide: 'IPersonRepository', useClass: PersonRepository},
        {provide: 'CreateCollaborator', useClass: createCollaboratorUseCase},
        {provide: 'FindCollaborator', useClass: findCollaboratorUseCase},
        {provide: 'updateCollaborator', useClass: updateCollaboratorUseCase},
        {provide: 'deactivateCollab', useClass: deactivateCollaboratorUseCase}
    ]
})
export default class EstablishmentModule {}