import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import PersonDomainEntity from "../entities/person.domain";
import { filter } from "../enum/filter.enum";
import IPersonRepository from "../interfaces/IPersonRepository.interface";
import { IResponse } from "../interfaces/IResponse.interface";
import { Repository } from "typeorm";
import { Person } from "src/adapters/framework/database/entities/Person.entity";
import { Inject, Injectable } from "@nestjs/common";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { CheckFilter } from "../helpers/checkFilter.helper";
import { Address } from "src/adapters/framework/database/entities/Addresses.entity";

@Injectable()
export default class PersonRepository implements IPersonRepository {
    constructor(
       @Inject("DatabaseGateway") private readonly database: DatabaseGateway,  
       @Inject("LoggerGateway") private readonly logger: LoggerGateway) 
    {}

    async paginateResults(page: number, limit: number, filterStatement: filter): Promise<IResponse<Person>> {
        try {
            this.logger.log("Criando repository para pessoa... [PersonRepository]")
            const respository = await this.database.getDataSource().then(e => e.getRepository(Person))            
            let whereStatement: any = await CheckFilter(filterStatement, this.logger);
            
            const pages = (page -1) * limit;
            const result = await respository.findAndCount({
                select: {Uuid: true, isActive: true, Name: true},
                where: whereStatement,
                skip: pages,
                take: limit
            });
            const totalPages = result[1] / limit;
            this.logger.log("Efetuado busca de resultados paginados... [PersonRepository]")
            (await this.database.getDataSource()).destroy();
            return {
                pagina_atual: page,
                total_paginas: totalPages,
                total_itens: result[1],
                resultados: result[0]
            }
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar paginar os resultados... [PersonRepository]: ${error}`)
            (await this.database.getDataSource()).destroy();
        }
    }
    async createClientPerson(data: Person): Promise<void> {
        try {
            if(!data.IsClient) throw new Error("A pessoa deve estar marcada como cliente.");
            this.logger.log("Gerando transaction... [PersonRepository]")
            await (await this.database.getDataSource()).transaction(async (entityManager) => {
                const repo = entityManager.getRepository(Person)
                await repo.save(data)
            });
            this.logger.log("Client inserido no banco de dados com sucesso... [PersonRepository]")
            (await this.database.getDataSource()).destroy()
        } catch (error) {
            (await this.database.getDataSource()).destroy()
            this.logger.error(`Houve um erro ao tentar criar o cliente.... [PersonRespository]`)
        }
    }
    createSupplierPerson(data: Person): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createOperatorPerson(data: Person): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createCollaboratorPerson(data: Person): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateClientPerson(data: Person, uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateOperatorPerson(data: Person, uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateCollaboratorPerson(data: Person, uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateSupplierPerson(data: Person, uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deactivePerson(uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    } 
    
}