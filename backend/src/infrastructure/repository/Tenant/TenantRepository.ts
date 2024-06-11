import { Inject } from "@nestjs/common";
import ITenantRepository from "../abstraction/ITenantRepository.interface";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";
import { Stock } from "src/infrastructure/database/models/Stock.entity";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { ITenantDto } from "src/application/dto/interfaces/ITenant.dto";

export default class TenantRepository implements ITenantRepository {
    constructor(
        @Inject("DatabaseGateway") private readonly database: DatabaseGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) { }

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
            this.logger.log(`Houve um erro ao efetuar o processo de paginação:  [TenantRepository] ${error}`);
            return null;
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
            this.logger.log(`Houve um erro ao efetuar a busca do Tenant:  [TenantRepository] ${error}`);
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
            const repo = db.getRepository(Tenant);
            const result = await repo.findOneBy({ Uuid: uuid });
            await this.database.closeConnection(db);
            return result;
        } catch (error) {
            this.logger.log(`Houve um erro ao efetuar a busca do Tenant:  [TenantRepository] ${error}`);
            return null;
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
                const tenantCreated = repo.create({
                    Name: tenant.Name,
                });
                const savedTenant = await manager.save(tenantCreated);
                const stock = repoStock.create({
                    Tenant: savedTenant
                });
                await manager.save(stock);
            })
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.log(`Houve um erro ao efetuar a busca do Tenant:  [TenantRepository] ${error}`);
            return false;
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
            this.logger.log(`Houve um erro ao efetuar a busca do Tenant:  [TenantRepository] ${error}`);
            return false;
        }
    }
}