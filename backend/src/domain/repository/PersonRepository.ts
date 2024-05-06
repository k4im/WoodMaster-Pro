import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { filter } from "../enum/filter.enum";
import IPersonRepository from "../interfaces/IPersonRepository.interface";
import { IResponse } from "../interfaces/IResponse.interface";
import { Person } from "src/adapters/framework/database/entities/Person.entity";
import { Inject, Injectable } from "@nestjs/common";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { CheckFilter } from "../helpers/checkFilter.helper";
import PersonDomainEntity from "../entities/person.domain";
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
                take: limit,
                cache: 30000
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

    /**
     * O metodo podera ser utilizado para efetuar a criação de uma nova pessoa,
     * onde deverá ser repassado a entidade de dominio para o repositorio para que então
     * seja possivel efetuar a criação de um novo registro no banco.
     * @param data Recebe uma entidada do tipo PessoaDomainEntity
     * @example 
     * const repo = new PersonRepository(DatabaseGateway, Logger);
     * const novaPessoa = new PessoaDomainEntity(...dados);
     * const result = await repo.createPerson(novaPessoa);
     * (result) ? "A pessoa foi criada com sucesso" : "Houve um erro ao tentar criar a pessoa";
     * @returns boolean
     */
    async createPerson(data: PersonDomainEntity): Promise<boolean> {
        try {
            this.logger.log("Gerando transaction... [PersonRepository]")
            await (await this.database.getDataSource()).transaction(async (entityManager) => {
                const repo = entityManager.getRepository(Person)
                this.logger.log("Criando pessoa... [PersonRepository]")
                const person = repo.create({
                    ...data,
                    Name: data.Name.getFullName(),
                    Email: data.Email.email,
                    FathersName: data.FathersName.getFullName(),
                    MothersName: data.MothersName.getFullName(),
                    Cpf: data.Cpf.cpf,
                    Rg: data.Rg.Rg,
                    Addresses: [...data.Addresses.map(e => {
                        this.logger.log("Criando endereços... [PersonRepository]")
                        const ad = new Address();
                        ad.City = e.City;
                        ad.Country = e.Country;
                        ad.Neighborhood = e.Neighborhood;
                        ad.Observations = e.Observations;
                        ad.ZipCode = e.ZipCode;
                        ad.State = e.State;
                        ad.StreetName = e.StreetName;
                        return ad
                    })],
                    Phones: [...data.Phones],
                });
                await repo.save(person);
            });
            this.logger.log("Pessoa inserida no banco de dados com sucesso... [PersonRepository]")
            (await this.database.getDataSource()).destroy()
            return true;
        } catch (error) {
            (await this.database.getDataSource()).destroy()
            this.logger.error(`Houve um erro ao tentar criar a pessoa.... [PersonRespository]`)
            return false;
        }
    }
    updatePerson(data: PersonDomainEntity, uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deactivePerson(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    } 
    
}