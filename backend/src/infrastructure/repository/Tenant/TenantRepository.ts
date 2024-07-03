import { Inject } from "@nestjs/common";
import ITenantRepository from "../abstraction/ITenantRepository.interface";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";
import { Stock } from "src/infrastructure/database/models/Stock.entity";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { ITenantDto } from "src/application/dto/interfaces/ITenant.dto";
import ExpectedError from "src/domain/exceptions/expected.error";
import { User } from "src/infrastructure/database/models/User.entity";
import IRoleService from "src/infrastructure/services/Role/IRole.interface";
import RoleDomainEntity from "src/domain/entities/role.domain";
import { Role } from "src/application/enum/roles.enum";

export default class TenantRepository implements ITenantRepository {
    constructor(
        @Inject("DatabaseGateway") private readonly database: DatabaseGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway,
        @Inject("IRoleService") private readonly roleService: IRoleService
    ) { }
  

    /**
     * O metodo será utilizado para efetuar a paginação dos tenants que encontram-se
     * presentes na base de dados.
     * @param page recebe a pagina que para navegação
     * @param limit recebe o limite por pagina.
     * @returns IResponse
     */
    async paginatedTenants(page: number, limit: number): Promise<IResponse<ITenantDto>> {
        const pages = (page - 1) * limit;
        try {
            const db = await this.database.getDataSource();
            const repo = db.getRepository(Tenant);

            const result = await repo.findAndCount({
                select: { Id: true, Uuid: true, Name: true, IsActive: true },
                skip: pages,
                take: limit
            });
            const totalPages = Math.ceil(result[1] / limit);
            await this.database.closeConnection(db);
            return {
                pagina_atual: page,
                total_itens: result[1],
                total_paginas: totalPages,
                resultados: result[0].map(t => {
                    const tenant: ITenantDto = {
                        Uuid: t.Uuid,
                        Name: t.Name,
                        IsActive: t.IsActive
                    }
                    return tenant;
                })
            }
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar o processo de paginação:  [TenantRepository] ${error}`);
            throw new ExpectedError(error.message);
        }
    }

    /**
     * Estará filtrando o tenant por Name.
     * @param name recebe o nome do tenant.
     * @returns ITenantDto
     */
    async findTenantByName(name: string): Promise<ITenantDto> {
        try {
            const db = await this.database.getDataSource();
            const repo = db.getRepository(Tenant);
            const result = await repo.findOneBy({ Name: name });
            await this.database.closeConnection(db);
            return {Uuid: result.Uuid, Name: result.Name, IsActive: result.IsActive};
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a busca do Tenant:  [TenantRepository] ${error}`);
            throw new ExpectedError(error.message);
        }
    }
    
    /**
     * Efetua a busca do tenant baseando-se no uuid.
     * @param uuid recebe o UUID para filtragem.
     * @returns ITenantDto
     */
    async findTenantByUuid(uuid: string): Promise<Tenant> {
        try {
            const db = await this.database.getDataSource();
            const result = await db.getRepository(Tenant).findOne({where: {Uuid: uuid}})
            await this.database.closeConnection(db);
            return result;
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a busca do Tenant:  [TenantRepository] ${error}`);
            throw new ExpectedError(error.message);
        }
    }
    
    /**
     * Efetua a criação de um novo tenant.
     * @param tenant 
     * @returns boolean
     */
    async createTenant(tenant: any): Promise<boolean> {
        try {
            const db = await this.database.getDataSource();
            await db.manager.transaction(async (manager) => {
                const repo = manager.getRepository(Tenant);
                const repoStock = manager.getRepository(Stock);
                const userRepo = manager.getRepository(User);
                const tenantCreated = repo.create({
                    Name: tenant.Name,
                });
                const savedTenant = await manager.save(tenantCreated);
                const stock = repoStock.create({
                    Tenant: savedTenant
                });
                await manager.save(stock);
                const role = await this.roleService.getOrCreateRole(manager, new RoleDomainEntity(Role.admin))
                const user = userRepo.create({
                    EmailAddr: tenant.Email.email,
                    HashPassword: tenant.Password.value,
                    Tenant: tenantCreated,
                    Role: role
                });
                await manager.save(user)
            })
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a busca do Tenant:  [TenantRepository] ${error}`);
            throw new ExpectedError(error.message);
        }
    }
    
    /**
     * Efetua a desativação de um tenant.
     * @param uuid recebe o uuid para desativar o tenant.
     * @returns boolean
     */
    async deactiveTenant(uuid: string): Promise<boolean> {
        try {
            const db = await this.database.getDataSource();
            const repo = db.getRepository(Tenant);
            await repo.update({ Uuid: uuid }, { IsActive: false })
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a busca do Tenant:  [TenantRepository] ${error}`);
            throw new ExpectedError(error.message);
        }
    }
    /**
     * Efetua a reativação de um tenant.
     * @param uuid recebe o uuid para desativar o tenant.
     * @returns boolean
     */
    async reactivateTenant(uuid: string): Promise<boolean> {
        try {
            const db = await this.database.getDataSource();
            const repo = db.getRepository(Tenant);
            await repo.update({ Uuid: uuid }, { IsActive: true })
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a busca do Tenant:  [TenantRepository] ${error}`);
            throw new ExpectedError(error.message);
        }
    }
    
    /**
     * Atualiza o nome de um tenant.
     * @param uuid uuid do tenant
     * @param name novo nome
     * @returns boolean
     */
    async updateTenantName(uuid: string, name: string): Promise<boolean> {
        try {
            const db = await this.database.getDataSource();
            const repo = db.getRepository(Tenant);
            await repo.update({Uuid: uuid}, {Name: name})
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao efetuar a atualização do Tenant:  [TenantRepository] ${error}`)
            throw new ExpectedError(error.message)
        }
    }
}