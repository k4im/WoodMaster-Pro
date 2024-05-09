import { Inject, Injectable } from "@nestjs/common";
import { Person } from "src/adapters/framework/database/entities/Person.entity";
import { User } from "src/adapters/framework/database/entities/User.entity";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { IUserDto } from "src/domain/dto/IUser.dto";
import UserDomanEntity from "src/domain/entities/user.domain";
import { IResponse } from "src/domain/interfaces/IResponse.interface";
import RoleService from "src/infrastructure/services/role.service";
import IUserRespository from "../abstraction/IUserRepository.interface";


@Injectable()
export default class UserRepository implements IUserRespository {

    constructor(
        @Inject("RoleService") private readonly roleService: RoleService,
        @Inject("DatabaseGateway") private readonly database: DatabaseGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) { }
    
    /**
     * O metodo estará buscando um usuario a partir de um uuid.
     * @param uuid recebe o uuid
     * @param tenantId recebe o tenantId para filtragem
     * @returns IUserDto
     */
    async findUserByUuid(uuid: string, tenantId: string): Promise<IUserDto> {
        try {
            const db = await this.database.getDataSource();
            const result = await db.getRepository(User).findOne({
                relations: ["Role", "Role.Permissions"],
                where: { Uuid: uuid, Tenant: { Uuid: tenantId } }
            });
            return {
                Uuid: result.Uuid,
                Email: result.EmailAddr, IsActive: result.IsActive,
                Role: result.Role.Name,
                Permissions: result.Role.Permissions.map(perm => perm.Action)
            };
        } catch (error) {

        }
    }

    /**
     * O metodo poderá ser utilizado para efetuar 
     * a paginação do sdados de usuario.
     * @param page recebe a pagina para navegação
     * @param limit recebe o limite de dados por pagina
     * @param tenantId recebe o tenant para filtragem
     * @returns IReponse
     */
    async paginateUsers(page: number, limit: number, tenantId: string): Promise<IResponse<IUserDto>> {
        try {
            const db = await this.database.getDataSource();
            const repo = db.getRepository(User);
            const pages = (page - 1) * limit;

            const result = await repo.findAndCount({
                select: { Id: true, Uuid: true, EmailAddr: true, IsActive: true, Role: { Name: true, Permissions: { Id: true, Action: true } }, Tenant: {} },
                relations: ['Tenant', 'Role', 'Role.Permissions'],
                where: { Tenant: { Uuid: tenantId } },
                skip: pages,
                take: limit
            });

            await this.database.closeConnection(db);
            return {
                pagina_atual: page,
                total_paginas: Math.ceil(result[1] / limit),
                total_itens: result[1],
                resultados: result[0].map(user => {
                    const userDto: IUserDto = {
                        Uuid: user.Uuid,
                        Email: user.EmailAddr,
                        IsActive: user.IsActive,
                        Role: user.Role.Name,
                        Permissions: user.Role.Permissions.map(perm => perm.Action),
                    };
                    return userDto;
                })
            };
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a paginação.... [UserRespository]: ${error}`);
        }
    }

    /**
     * O metodo podera ser utilizado para efetuar a criação de um usuario.
     * @param data recebe os dados do controller para efetuar a criação do usuario
     * @returns boolean
     */
    async createNewUser(data: UserDomanEntity): Promise<boolean> {
        try {
            const db = await this.database.getDataSource();
            await db.manager.transaction(async (manager) => {
                const userRepo = manager.getRepository(User);
                const role = await this.roleService.getOrCreateRole(manager, data.Role);

                const person = await manager.getRepository(Person).findOne({ relations: ['Tenant'], where: { Uuid: data.PersonId } });

                const user = userRepo.create({
                    EmailAddr: data.EmailAddr.email,
                    Person: person,
                    HashPassword: data.Password,
                    Tenant: person.Tenant,
                    Role: role,
                    IsActive: data.IsActive,
                });

                await userRepo.save(user);

            });
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar criar o usuario [UserRepositoy]: ${error}`)
            return false;
        }
    }

    /**
     * O metodo estará efetuando a atualizaão de senha e também de email do usuario.
     * @param data recebe os dados para atualização.
     * @param uuid recebe o uuid.
     * @returns boolean
     */
    async updateUser(data: UserDomanEntity, uuid: string): Promise<boolean> {
        try {
            const db = await this.database.getDataSource();
            const repo = db.getRepository(User);
            const user = await repo.findOneBy({Uuid: uuid});
            user.EmailAddr = data.EmailAddr.email;
            user.HashPassword = data.Password;
            await repo.save(user);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar atualizar o usuario [UserRepositoy]: ${error}`)
            return false;
        }
    }

    /**
     * Estará desativando um usuario a partir do uuid.
     * @param uuid uuid do usuario para desativação
     * @returns boolean
     */
    async deactiveUser(uuid: string): Promise<boolean> {
        try {
            const db = await this.database.getDataSource();
            await db.getRepository(User).update({Uuid: uuid},{IsActive: false});
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar desativar o usuario [UserRepositoy]: ${error}`)
            return false;
        }
    }

}