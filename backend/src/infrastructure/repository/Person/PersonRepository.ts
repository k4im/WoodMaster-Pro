import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { filter } from "../../../application/enum/filter.enum";
import IPersonRepository from "../abstraction/IPersonRepository.interface";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import PersonDomainEntity from "../../../domain/entities/person.domain";

import { CheckFilter } from "src/infrastructure/helpers/checkFilter.helper";
import { Person } from "src/infrastructure/database/models/Person.entity";
import { Address } from "src/infrastructure/database/models/Addresses.entity";
import { Phone } from "src/infrastructure/database/models/Phone.entty";
import { Addr, IPersonDto } from "src/application/dto/interfaces/Person.dto";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import ExpectedError from "src/domain/types/expected.error";
import { User } from "src/infrastructure/database/models/User.entity";

@Injectable()
export default class PersonRepository implements IPersonRepository {
    constructor(
        @Inject("DatabaseGateway") private readonly database: DatabaseGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) { }

    /**
     * Deve buscar uma pessoa no banco de dados.
     * @param uuid uuid do cliente
     * @param tenantId tenantId do cliente
     * @returns IPersonDto
     */
    async findPersonByUuid(uuid: string, tenantId: string): Promise<IPersonDto> {
        try {
            this.logger.log("Criando repository para pessoa... [PersonRepository]")
            const db = await this.database.getDataSource();
            const repository = db.getRepository(Person);
            this.logger.log("Efetuado busca de pessoa por uuid... [PersonRepository]")
            const result = await repository.findOne({ relations: { Addresses: true, Phones: true, Tenant: true }, where: { Uuid: uuid.toString(), Tenant: { Uuid: tenantId.toString() } } });
            return {
                Name: result.Name,
                isActive: result.isActive,
                Uuid: result.Uuid,
                Tenant: result.Tenant.Uuid,
                Email: result.Email,
                Addresses: result.Addresses.map(addr => {
                    const addrs: Addr = {
                        City: addr.City, Country: addr.Country,
                        Neighborhood: addr.Neighborhood, Observations: addr.Observations,
                        State: addr.State, StreetName: addr.StreetName, ZipCode: addr.ZipCode
                    }
                    return addrs;
                }),
                MothersName: result.MothersName,
                FathersName: result.FathersName,
                Cpf: '***********',
                Rg: '***********',
                Phones: result.Phones.map(phone => {
                    return { isPrimary: phone.IsPrimary, number: phone.Phone }
                })
            };
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar buscar pessoa... [PersonRepository]: ${error}`)
            throw new ExpectedError(error.message);
        }
    }

    /**
     * O metodo poderá ser utilizado para efetuar a paginação do banco de dados
     * onde estará navegando através de paginas e efetuando a delemitação de resultados
     * através de limit.
     * @param page recebe a pagina para efetuar a nevageção no banco de dados.
     * @param limit recebe o limite de dados que serão apresentados na paginação.
     * @param filterStatement recebe o filtro para criação do stetament
     * @example
     * const repo =- new PersonRepository(DatabaseGateway, Logger);
     * await repo.paginateResults(1, 10, filter.client);
     * @returns IResponse<Person>
     */
    async paginateResults(page: number, limit: number, tenantId: string, filterStatement: filter): Promise<IResponse<IPersonDto>> {
        try {
            this.logger.log("Criando repository para pessoa... [PersonRepository]")
            const db = await this.database.getDataSource();
            const respository = db.getRepository(Person);

            let whereStatement: any = await CheckFilter(tenantId, filterStatement, this.logger);
            const pages = (page - 1) * limit;

            const result = await respository.findAndCount({
                select: { Id: true, Uuid: true, Name: true, isActive: true, Tenant: { Uuid: true } },
                relations: ['Tenant'],
                where: whereStatement,
                skip: pages,
                take: limit,
            });
            const totalPages = Math.ceil(result[1] / limit);
            this.logger.log("Efetuado busca de resultados paginados... [PersonRepository]")
            await this.database.closeConnection(db);

            return {
                pagina_atual: page,
                total_paginas: totalPages,
                total_itens: result[1],
                resultados: result[0].map(e => {
                    const person: IPersonDto = {
                        Uuid: e.Uuid,
                        Name: e.Name,
                        isActive: e.isActive,
                        Tenant: e.Tenant.Uuid
                    };
                    return person;
                })
            }
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar paginar os resultados... [PersonRepository]: ${error}`)
            throw new ExpectedError(error.message);
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
            const db = await this.database.getDataSource();
            await db.manager.transaction(async (entityManager) => {
                const repo = entityManager.getRepository(Person)
                const repoAddr = entityManager.getRepository(Address)
                const repoPhone = entityManager.getRepository(Phone)

                this.logger.log("Criando pessoa... [PersonRepository]")
                const person = repo.create({
                    ...data,
                    Name: data.Name.getFullName(),
                    Email: data.Email.email,
                    FathersName: data.FathersName.getFullName(),
                    MothersName: data.MothersName.getFullName(),
                    Cpf: data.Cpf.value,
                    Rg: data.Rg.value,
                    Tenant: data.getTenant()
                });
                await entityManager.save(person);
                const addr = await Promise.all(data.Addresses.map(async addr => {
                    const addrObj = await repoAddr.create({
                        City: addr.City,
                        Country: addr.Country,
                        Neighborhood: addr.Neighborhood,
                        StreetName: addr.StreetName,
                        State: addr.State,
                        ZipCode: addr.ZipCode,
                        Person: person
                    })
                    return addrObj;
                }));
                await entityManager.save(addr);
                const phones = await Promise.all(data.Phones.map(async phon => {
                    const phones = await repoPhone.create({
                        Person: person,
                        IsPrimary: phon.IsPrimary,
                        Phone: phon.Phone
                    })
                    return phones;
                }))
                await entityManager.save(phones);
            });
            await this.database.closeConnection(db);
            this.logger.log("Pessoa inserida no banco de dados com sucesso... [PersonRepository]")
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar criar a pessoa.... [PersonRespository]: ${error}`)
            throw new ExpectedError(error.message);
        }
    }

    /**
     * Metodo sera utilizado para efetuar a atualização de um cliente
     * onde poderá estar sendo repassado todos os dados necessários para efetuar a operação.
     * @param data Recebe a entidade contendo os dados da pessoa.
     * @param uuid recebe o uuid para efetuar a atualização.
     * @example
     * const repo = new PersonRepository(DatabaseGateway, Logger);
     * const result = await repo.updatePerson(data, "7e91752c-4c16-4db7-91be-f2c03aed2e2c");
     * (result) ? "Pessoa atualizada com sucesso!" : "Houve um erro ao tentar atualizar a pessoa";
     * @returns Promise<boolean>
     */
    async updatePerson(data: PersonDomainEntity, uuid: string): Promise<boolean> {
        try {
            this.logger.log("Gerando transcation.... [PersonRepository]");
            const db = await this.database.getDataSource();
            await db.transaction(async (entityManager) => {
                const repo = entityManager.getRepository(Person);
                const person = await repo.findOneBy({ Uuid: uuid.toString() });
                if (!person) {
                    this.logger.error(`Não foi possivel localizar a pessoa com este uuid... [PersonRepository]`);
                    throw new HttpException('Person not founded.',
                        HttpStatus.NOT_FOUND)
                };
                person.Name = data.Name.getFullName();
                person.Email = data.Email.email;
                person.Cpf = data.Cpf.value;
                person.Rg = data.Rg.value;
                person.IsClient = data.IsClient;
                person.isActive = data.IsActive;
                person.IsSupplier = data.IsSupplier;
                person.IsCollaborator = data.IsCollaborator;
                person.IsOperator = data.IsOperator;
                await repo.save(person);
                data.Addresses.map(async ad => {
                    await entityManager.getRepository(Address).update({ Person: person },
                        {
                            City: ad.City, Country: ad.Country, Neighborhood: ad.Neighborhood,
                            Observations: ad.Observations, ZipCode: ad.ZipCode, State: ad.State,
                            StreetName: ad.StreetName, Person: person
                        })
                })
                data.Phones.map(async p => {
                    await entityManager.getRepository(Phone).update({ Person: person },
                        { Phone: p.Phone, IsPrimary: p.IsPrimary, Person: person })
                })
            })
            this.logger.log("Efetuado update de pessoa.... [PersonRepository]");
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar atualizar a pessoa.... [PersonRepository]: ${error}`)
            if(error instanceof HttpException)
                throw error
            throw new ExpectedError(error.message)
        }
    }
    /**
     * O metodo sera utilizado para realizar a desativação de uma pessoa.
     * @param uuid Recebe o uuid da pessoa que sera desativada.
     * @returns Promise<boolean>
     */
    async deactivePerson(uuid: string): Promise<boolean> {
        try {
            this.logger.log("Gerando transcation.... [PersonRepository]");
            const db = await this.database.getDataSource();
            await db.transaction(async (entityManager) => {
                const person = await entityManager.getRepository(Person)
                    .findOne({
                        relations: { User: true },
                        where: { Uuid: uuid }
                    });
                const repo = entityManager.getRepository(Person);
                try {
                    await entityManager
                        .getRepository(User)
                        .update({ EmailAddr: person.User.EmailAddr },
                            { IsActive: false })
                } catch (error) {
                    this.logger.log(`usuario não encontrado para esta pessoa: ${error.message} `)
                }
                await repo.update({ Uuid: uuid.toString() }, { isActive: false });
            });
            this.logger.log("Efetuado desativação de pessoa.... [PersonRepository]");
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar desativar a pessoa.... [PersonRepository]: ${error}`)
            throw new ExpectedError(error.message)
        }
    }
    /**
  * O metodo sera utilizado para realizar a reativação de uma pessoa.
  * @param uuid Recebe o uuid da pessoa que sera desativada.
  * @returns Promise<boolean>
  */
    async reactivatePerson(uuid: string): Promise<boolean> {
        try {
            this.logger.log("Gerando transcation.... [PersonRepository]");
            const db = await this.database.getDataSource();
            await db.transaction(async (entityManager) => {
                const person = await entityManager.getRepository(Person)
                    .findOne({
                        relations: { User: true },
                        where: { Uuid: uuid }
                    });
                const repo = entityManager.getRepository(Person);
                try {
                    await entityManager
                        .getRepository(User)
                        .update({ EmailAddr: person.User.EmailAddr },
                            { IsActive: true })
                } catch (error) {
                    this.logger.log(`usuario não encontrado para esta pessoa: ${error.message} `)
                }
                await repo.update({ Uuid: uuid.toString() }, { isActive: true });
            });
            this.logger.log("Efetuado desativação de pessoa.... [PersonRepository]");
            await this.database.closeConnection(db);
            return true;
        } catch (error) {
            this.logger.error(`Houve um erro ao tentar desativar a pessoa.... [PersonRepository]: ${error}`)
            throw new ExpectedError(error.message)

        }
    }
}