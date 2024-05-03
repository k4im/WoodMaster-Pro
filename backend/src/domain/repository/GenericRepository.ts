import { Inject, Injectable } from "@nestjs/common";
import { IGenericRepository } from "src/application/ports/out-ports/GenericRepository.gateway";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { DataSource, EntityTarget } from "typeorm";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";

@Injectable()
export class GenericRepository<T> implements IGenericRepository<T> {
    
    private database: DataSource;
    
    constructor(
        private readonly entity: EntityTarget<T>,
        @Inject("DatabaseGateway") private readonly db: DatabaseGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) 
        {
            this.database = db.connect()
        }

    async paginateResults(page: number, limit: number, selectState: any): Promise<T[]> {
        try {
            this.logger.log("Efetuando operação de paginação no banco de dados.... [Repository]")
            const pages = (page - 1) * limit;
            const result = await this.database.getRepository(this.entity).find({
                select: selectState,
                skip: limit,
                take: pages
            });
            this.database.destroy();
            return result;
        } catch (error) {
            this.logger.error(`Houve um erro ao realizar a paginação... [Repository]: ${error}`)
            this.database.destroy();
        }
    }
    async findRegister(whereStatement: any): Promise<T> {
        try {
            this.logger.log("Efetuando busca no banco de dados.... [Repository]")
            const result = await this.database.getRepository(this.entity).findOne({where: whereStatement})
            this.database.destroy();
            return result;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar realizar a busca... [Repository]: ${error}`)
            this.database.destroy();
        }
    }
    async createRegister(data: any): Promise<boolean> {
        try {
           this.logger.log("Efetuando operação de inserção no banco.... [Repository]");
           await this.database.getRepository(this.entity).create(data); 
           await this.database.getRepository(this.entity).save(data);
           return true; 
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar realizar a inserção no banco.... [Repository]: ${error}`);
            this.database.destroy();
            return false;
        }
    }
    async updateRegister(data: any, uuid: string): Promise<boolean> {
        try {
            this.logger.log(`atualizando registro em banco.... [Repository]`);
            await this.database.getRepository(this.entity).update(uuid, data);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar realizar update no banco.... [Repository]: ${error}`);
            return false;
        }
    }
    async deactivateRegister(uuid: string, data: any): Promise<boolean> {
        try {
            this.logger.log(`atualizando registro em banco.... [Repository]`);
            await this.database.getRepository(this.entity).update(uuid, data);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar realizar update no banco.... [Repository]: ${error}`);
            return false;
        }    }

}