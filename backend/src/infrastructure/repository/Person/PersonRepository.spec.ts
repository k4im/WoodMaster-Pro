import { Test, TestingModule } from '@nestjs/testing';
import PersonRepository from './PersonRepository';
import { DatabaseInMemory } from 'src/infrastructure/database/databaseInMemory.service';
import { filter } from 'src/application/enum/filter.enum';
import PersonDomainEntity from 'src/domain/entities/person.domain';
import { Address } from 'src/domain/valueObjects/AddressVo/address.value.object';
import { Phone } from 'src/domain/valueObjects/phone.value.object';
import * as fs from 'fs';
import * as path from 'path';
import { Cpf } from 'src/domain/valueObjects/cpfVo/cpf.value.object';
import { Email } from 'src/domain/valueObjects/emailVo/email.value.object';
import { Name } from 'src/domain/valueObjects/nameVo/name.value.object';
import { RgDocument } from 'src/domain/valueObjects/rgVo/rg.value.object';
import { FakeLogger } from 'src/infrastructure/logger/Fakelogger.service';
import { Tenant } from 'src/infrastructure/database/models/Tenant.entity';

describe('PersonRepository', () => {
    let repository: PersonRepository;
    let databaseInMemory: DatabaseInMemory
    let tenant: Tenant

    beforeEach(async () => { 
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PersonRepository, 
                {provide: "LoggerGateway", useClass: FakeLogger}, 
                {provide: "DatabaseGateway", useClass: DatabaseInMemory},
            ]
        
        }).compile();
        repository = module.get<PersonRepository>(PersonRepository);
    });
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DatabaseInMemory]
        
        }).compile();
        databaseInMemory = module.get<DatabaseInMemory>(DatabaseInMemory);
        const db = await databaseInMemory.getDataSource();
        const repo = db.getRepository(Tenant);
        tenant = repo.create({
            Name: "Tenant Geraldo"
        });
        await repo.save(tenant);
        await db.destroy();
        
    });  
    test("Deve criar novo registro em banco", async () => {
        const person = new PersonDomainEntity(
            new Name("Joao", "Victor"), 
            new Email("contato@exampleer.com"),
            [new Address("José Berlim", "Lages", "Uni", "88525860", "Brasil", "SC", true)], 
            [new Phone('123123123123', true)],
            new Name("Joao", "Vsictor"),
            new Name("Joao", "Victor"), 
            new Cpf("77282174024"),
            new RgDocument("43.515.271-3"));
        person.setTenant(tenant);
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
            new Cpf("20468600043"),
            new RgDocument("11.877.298-3"),
            true);
        person.setTenant(tenant);
        await repository.createPerson(person);
        
        const result = await repository.paginateResults(1, 10, tenant.Uuid, filter.client);
        expect(result.resultados).toHaveLength(1)
    });

    test("Deve desativar uma pessoa", async () => { 
        const persons = await repository.paginateResults(1, 10, tenant.Uuid, filter.client);
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
            new RgDocument("23.623.487-0"),
            true);
        
        const persons = await repository.paginateResults(1, 10, tenant.Uuid, filter.client);
        const result = await repository.updatePerson(personUpdated, persons.resultados[0].Uuid);
        expect(result).toBe(true);
    })
    test("Deve buscar uma pessoa a partir do uuid", async () => {
        const persons = await repository.paginateResults(1, 10, tenant.Uuid, filter.client);
        const result = await repository.findPersonByUuid(persons.resultados[0].Uuid, tenant.Uuid);
        expect(result.Uuid).toEqual(persons.resultados[0].Uuid);

    })
    
    /**O METODO DEVERÁ SER ATIVADO CASO QUEIRA RODAR O TESTE DE FORMA UNITÁRIA PARA VALIDAÇÃO */
    /** A função será executada no final de todos os testes 
     * onde estará removendo o arquivo de banco de dados.
     */
    afterAll(async () => {
        const srcPath = path.resolve(__dirname, '../../../../:memory');
        fs.unlinkSync(srcPath);
    })
})