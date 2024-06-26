import { Module } from "@nestjs/common";
import { DatabaseMysqlAdapter } from "src/infrastructure/database/database.service";
import { CustomLogger } from "src/infrastructure/logger/logger.service";
import AuthUseCase from "./commands/authentication/auth.usecase";
import AuthService from "src/infrastructure/services/auth/auth.service";
import TenantRepository from "src/infrastructure/repository/Tenant/TenantRepository";
import UserRepository from "src/infrastructure/repository/User/UserRepository";
import JwtCustomService from "src/infrastructure/services/jwt/JwtService";
import RoleService from "src/infrastructure/services/Role/role.service";
import EstablishmentLoginController from "src/application/http/routes/establishment/controllers/EstablishmentLogin.controler";
import ListCollaboratorsController from "src/application/http/routes/establishment/controllers/collaborators/listCollaborators.controller";
import FindCollaboratorController from "src/application/http/routes/establishment/controllers/collaborators/FindCollaborator.controller";
import CreateCollaboratorController from "src/application/http/routes/establishment/controllers/collaborators/CreateCollaborator.controller";
import UpdateCollaboratorController from "src/application/http/routes/establishment/controllers/collaborators/updateCollaborator.controller";
import DeactiveCollaboratorController from "src/application/http/routes/establishment/controllers/collaborators/DeactivateCollaborator.controller";
import PaginateCollaboratorsUseCase from "./commands/Collaborators/paginateCollaborator.usecae";
import PersonRepository from "src/infrastructure/repository/Person/PersonRepository";
import createCollaboratorUseCase from "./commands/Collaborators/createCollaborator.usecase";
import findCollaboratorUseCase from "./commands/Collaborators/findCollaborator.usecase";
import updateCollaboratorUseCase from "./commands/Collaborators/updateCollaborator.usecase";
import deactivateCollaboratorUseCase from "./commands/Collaborators/deactivateCollaborator.usecase";
import CaslModule from "src/application/casl/casl.module";
import CreateSupplierController from "src/application/http/routes/establishment/controllers/Suppliers/CreateSupplier.controller";
import CreateSupplierUseCase from "./commands/Supplier/createSupplier.usecase";
import ListSupplierController from "src/application/http/routes/establishment/controllers/Suppliers/ListSupplier.controller";
import FindSupplierUseCase from "./commands/Supplier/findSuppliers.usecase";
import CreateUserForCollaboratorController from "src/application/http/routes/establishment/controllers/collaborators/CreateUserCollaborator.controller";
import CreateUserForCollaborator from "./commands/Collaborators/createUserForCollaborator.usecase";
import FindSupplierByUuidUseCase from "./commands/Supplier/findSupplierByUuid.usecase";
import FindSupplierByUuidController from "src/application/http/routes/establishment/controllers/Suppliers/FindSupplier.controller";
import reactivateCollaboratorUseCase from "./commands/Collaborators/reactivateCollaborator.usecase";
import ReactiveCollaboratorController from "src/application/http/routes/establishment/controllers/collaborators/ReactivateCollaborator.controller";

@Module({
    imports: [CaslModule],
    controllers:
        [
            EstablishmentLoginController, ListCollaboratorsController,
            CreateCollaboratorController, FindCollaboratorController,
            UpdateCollaboratorController, DeactiveCollaboratorController, CreateSupplierController,
            ListSupplierController, CreateUserForCollaboratorController, FindSupplierByUuidController,
            ReactiveCollaboratorController
        ],
    providers:
        [
            { provide: 'LoggerGateway', useClass: CustomLogger },
            { provide: 'DatabaseGateway', useClass: DatabaseMysqlAdapter },
            { provide: "IAuthCommand", useClass: AuthUseCase },
            { provide: "AuthAbstraction", useClass: AuthService },
            { provide: 'ITenantRepository', useClass: TenantRepository },
            { provide: 'IUserRepository', useClass: UserRepository },
            { provide: 'IJwtService', useClass: JwtCustomService },
            { provide: 'RoleService', useClass: RoleService },
            { provide: 'listCollaborators', useClass: PaginateCollaboratorsUseCase },
            { provide: 'IPersonRepository', useClass: PersonRepository },
            { provide: 'CreateCollaborator', useClass: createCollaboratorUseCase },
            { provide: 'FindCollaborator', useClass: findCollaboratorUseCase },
            { provide: 'updateCollaborator', useClass: updateCollaboratorUseCase },
            { provide: 'deactivateCollab', useClass: deactivateCollaboratorUseCase },
            { provide: 'reactivateCollab', useClass: reactivateCollaboratorUseCase },
            { provide: 'IRoleService', useClass: RoleService },
            { provide: 'ICreateSupplierUseCase', useClass: CreateSupplierUseCase },
            { provide: 'IListSupplierUseCase', useClass: FindSupplierUseCase },
            { provide: 'ICreateUserForCollaborator', useClass: CreateUserForCollaborator },
            { provide: 'IFindSupplierByUuidUseCase', useClass: FindSupplierByUuidUseCase },

        ]
})
export default class EstablishmentModule { }