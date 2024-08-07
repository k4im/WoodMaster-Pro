import { Inject, Injectable } from "@nestjs/common";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import UserDomanEntity from "src/domain/entities/user.domain";
import IUserRespository from "../abstraction/IUserRepository.interface";
import { User } from "src/infrastructure/database/models/User.entity";
import { Person } from "src/infrastructure/database/models/Person.entity";
import IRoleService from "src/infrastructure/services/Role/IRole.interface";
import { IUserDto } from "src/application/dto/interfaces/IUser.dto";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import ExpectedError from "src/domain/exceptions/expected.error";


@Injectable()
export default class UserRepository implements IUserRespository {

    constructor(
        @Inject("RoleService") private readonly roleService: IRoleService,
        @Inject("DatabaseGateway") private readonly database: DatabaseGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) { }


    /**
     * Estará realizando a busca de um usuario baseando-se
     * no endereço de email fornecido.
     * @param email endereço de email a ser pesquisado.
     * @returns IUserDto
     */
    async findUserByEmail(email: string): Promise<IUserDto> {
        try {
            const db = await this.database.getDataSource();
            const result = await db.getRepository(User).findOne({
                relations: ["Role", "Tenant"],
                where: { EmailAddr: email.toString() }
            });
            await this.database.closeConnection(db);
            const valueReturn: IUserDto = {
                Uuid: result.Uuid,
                Email: result.EmailAddr, IsActive: result.IsActive,
                Role: result.Role.Name,
                Hash: result.HashPassword,
                Tenant: result.Tenant.Uuid,
            }
            return valueReturn;
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a busca por Email.... [UserRespository]: ${error}`);
            throw new ExpectedError(error.message);
        }
    }

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
                relations: ["Role", 'Tenant'],
                where: { Uuid: uuid.toString(), Tenant: { Uuid: tenantId.toString() } }
            });
            await this.database.closeConnection(db);
            return {
                Uuid: result.Uuid,
                Email: result.EmailAddr, IsActive: result.IsActive,
                Role: result.Role.Name,
                Tenant: result.Tenant.Uuid,
            };
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a busca por UUID.... [UserRespository]: ${error}`);
            throw new ExpectedError(error.message);
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
                select: {
                    Id: true, Uuid: true,
                    EmailAddr: true, IsActive: true,
                    Role: { Name: true },
                    Tenant: {}
                },
                relations: ['Tenant', 'Role'],
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
                    };
                    return userDto;
                })
            };
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a paginação.... [UserRespository]: ${error}`);
            throw new ExpectedError(error.message);
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

                const person = await manager.getRepository(Person)
                    .findOne({
                        relations: ['Tenant'],
                        where: { Uuid: data.PersonId }
                    });

                const user = userRepo.create({
                    EmailAddr: data.EmailAddr.email,
                    Person: person,
                    HashPassword: data.Password.value,
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
            throw new ExpectedError(error.message);
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
            const user = await repo.findOneBy({ Uuid: uuid.toString() });
            user.EmailAddr = data.EmailAddr.email;
            user.HashPassword = data.Password.value;
            await repo.save(user);
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar atualizar o usuario [UserRepositoy]: ${error}`)
            throw new ExpectedError(error.message)
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
            await db.getRepository(User).update({ Uuid: uuid.toString() }, { IsActive: false });
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar desativar o usuario [UserRepositoy]: ${error}`)
            throw new ExpectedError(error.message)
        }
    }

        /**
     * Estará desativando um usuario a partir do uuid.
     * @param uuid uuid do usuario para desativação
     * @returns boolean
     */
        async reactivateUser(uuid: string): Promise<boolean> {
            try {
                const db = await this.database.getDataSource();
                await db.getRepository(User).update({ Uuid: uuid.toString() }, { IsActive: true });
                await this.database.closeConnection(db);
                return true;
            } catch (error) {
                this.logger.error(`Houve um erro ao tentar desativar o usuario [UserRepositoy]: ${error}`)
                throw new ExpectedError(error.message)
            }
        }

}