import { Test, TestingModule } from '@nestjs/testing';
import PersonRepository from './PersonRepository';
import { CustomLogger } from 'src/adapters/out-adapters/logger/logger.service';
import { DatabaseInMemory } from 'src/adapters/framework/database/databaseInMemory.service';
import { filter } from 'src/domain/enum/filter.enum';
import PersonDomainEntity from 'src/domain/entities/person.domain';
import { Name } from 'src/domain/valueObjects/name.value.object';
import { Email } from 'src/domain/valueObjects/email.value.object';
import { Address } from 'src/domain/valueObjects/address.value.object';
import { Phone } from 'src/domain/valueObjects/phone.value.object';
import { Cpf } from 'src/domain/valueObjects/cpf.value.object';
import { RgDocument } from 'src/domain/valueObjects/rg.value.object';
import * as fs from 'fs';
import * as path from 'path';

describe('PersonRepository', () => {
    let repository: PersonRepository;

    beforeEach(async () => { 
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PersonRepository, 
                {provide: "LoggerGateway", useClass: CustomLogger}, 
                {provide: "DatabaseGateway", useClass: DatabaseInMemory}]
        
        }).compile();
        repository = module.get<PersonRepository>(PersonRepository);
    });

    test("Deve criar novo registro em banco", async () => {
        const person = new PersonDomainEntity(
            new Name("Joao", "Victor"), 
            new Email("contato@example.com"),
            [new Address("José Berlim", "Lages", "Uni", "88525860", "Brasil", "SC", true)], 
            [new Phone()],
            new Name("Joao", "Vsictor"),
            new Name("Joao", "Victor"), 
            new Cpf("00556100050"),
            new RgDocument("42.221.191-6"));
        const result = await repository.createPerson(person);
        expect(result).toBe(true)
    });

    test("Deve Paginar os resultados", async () => {
        const person = new PersonDomainEntity(
            new Name("Joao", "Victor"), 
            new Email("contato@exameple.com"),
            [new Address("José Berlim", "Lages", "Uni", "88525860", "Brasil", "SC", true)], 
            [new Phone("49999544196", true)],
            new Name("Joao", "Vsictor"),
            new Name("Joao", "Victor"), 
            new Cpf("12395969010"),
            new RgDocument("422211916"),
            true);
        await repository.createPerson(person);
        
        const result = await repository.paginateResults(1, 10, filter.client);
        expect(result.resultados).toHaveLength(1)
    });

    test("Deve desativar uma pessoa", async () => { 
        const persons = await repository.paginateResults(1, 10, filter.client);
        const result = await repository.deactivePerson(persons.resultados[0].Uuid);
        expect(result).toBe(true);
    });
  
    test("Deve atualizar uma pessoa", async () => {
        const personUpdated = new PersonDomainEntity(
            new Name("Jonas", "Victor"), 
            new Email("contato@exameple.com"),
            [new Address("José Berlim", "Lages", "Uni", "88525860", "Brasil", "SC", true)], 
            [new Phone("49999544196", true)],
            new Name("Joao", "Vsictor"),
            new Name("Joao", "Victor"), 
            new Cpf("12395969010"),
            new RgDocument("422211916"),
            true);
        const persons = await repository.paginateResults(1, 10, filter.client);
        const result = await repository.updatePerson(personUpdated, persons.resultados[0].Uuid);
        expect(result).toBe(true);
    })
    
    /** A função será executada no final de todos os testes onde estará removendo o arquivo de banco de dados
     * 
     */
    afterAll(async () => {
        const srcPath = path.resolve(__dirname, '../../../../:memory');
        fs.unlinkSync(srcPath);
    })
})