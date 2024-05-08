import { Inject, Injectable } from "@nestjs/common";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { DataSource } from "typeorm";
import IDatabaseService from "./database.interface";
import { User } from "src/adapters/framework/database/entities/User.entity";

@Injectable()
export default class DatabaseService implements IDatabaseService {

    constructor(
        @Inject("DatabaseGateway") private readonly database: DatabaseGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) { }

    /**
     * Metodo sera utilizado para executar o processo de paginação.
     * @param page recebe a pagina para navegação.
     * @param limit limite de resultados por pagina
     * @param tenantId tenantId para filtrar os dados
     * @returns [User[], number] 
     */
    async paginateUsers(page: number, limit: number, tenantId: string): Promise<[User[], number]> {
        const db = await this.openConnection();
        const repo = db.getRepository(User);
        const pages = (page - 1) * limit;
    
        const result = await repo.findAndCount({
            select: {Id: true, Uuid: true, EmailAddr: true, IsActive: true, Role: {Name: true, Permissions: {Id: true, Action: true}}, Tenant: {}},
            relations: ['Tenant', 'Role', 'Role.Permissions'],
            where: {Tenant: {Uuid: tenantId}},
            skip: pages,
            take: limit
        });  
    
        await this.database.closeConnection(db);
        return result;
    }

    async openConnection(): Promise<DataSource> {
        this.logger.log("Abrindo conexão com o banco de dados... [DatabaseService]");
        return this.database.getDataSource();
    }
    async closeConnection(db: DataSource): Promise<void> {
        this.logger.log("Fechando conexão com o banco de dados... [DatabaseService]");
        return await this.database.closeConnection(db);
    }
}