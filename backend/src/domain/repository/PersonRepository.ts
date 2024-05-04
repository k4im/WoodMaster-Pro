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
    createClientPerson(data: PersonDomainEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createSupplierPerson(data: PersonDomainEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createOperatorPerson(data: PersonDomainEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createCollaboratorPerson(data: PersonDomainEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateClientPerson(data: PersonDomainEntity, uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateOperatorPerson(data: PersonDomainEntity, uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateCollaboratorPerson(data: PersonDomainEntity, uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateSupplierPerson(data: PersonDomainEntity, uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deactivePerson(uuid: string): Promise<void> {
        throw new Error("Method not implemented.");
    } 
    
}