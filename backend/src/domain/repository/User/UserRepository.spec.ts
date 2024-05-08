import { CustomLogger } from "src/adapters/out-adapters/logger/logger.service";
import UserRepository from "./UserRepository";
import { DatabaseInMemory } from "src/adapters/framework/database/databaseInMemory.service";
import { Test, TestingModule } from "@nestjs/testing";
import { Person } from "src/adapters/framework/database/entities/Person.entity";
import PersonDomainEntity from "src/domain/entities/person.domain";
import { Name } from "src/domain/valueObjects/nameVo/name.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Address as AddressVo } from "src/domain/valueObjects/AddressVo/address.value.object";
import { Phone } from "src/domain/valueObjects/phone.value.object";
import { Cpf } from "src/domain/valueObjects/cpfVo/cpf.value.object";
import { RgDocument } from "src/domain/valueObjects/rgVo/rg.value.object";
import { Address } from "src/adapters/framework/database/entities/Addresses.entity";

import * as fs from 'fs';
import * as path from 'path';
import UserDomanEntity from "src/domain/entities/user.domain";
import RoleDomainEntity from "src/domain/entities/role.domain";
import { Actions } from "src/domain/enum/permissoes.enum";
import { Tenant } from "src/adapters/framework/database/entities/Tenant.entity";
import DatabaseService from "src/infrastructure/Database/database.service";
describe("UserRepository", () =>  {
    let repository: UserRepository;
    let database: DatabaseInMemory;
    let person: Person;
    let tenant: Tenant

    beforeEach(async () => { 
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepository, 
                {provide: "IDatabaseService", useClass: DatabaseService}, 
                {provide: "LoggerGateway", useClass: CustomLogger}, 
                {provide: "DatabaseGateway", useClass: DatabaseInMemory},
            ]
        
        }).compile();
        repository = module.get<UserRepository>(UserRepository);
    });
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DatabaseInMemory],
        
        }).compile();
        
        database = module.get<DatabaseInMemory>(DatabaseInMemory);
        const repo = (await database.getDataSource()).getRepository(Person);
        const repoTenant = (await database.getDataSource()).getRepository(Tenant);
        tenant = repoTenant.create({
            Name: "Tenant Geraldo"
        });
        await repoTenant.save(tenant);

        const persona = new PersonDomainEntity(
            new Name("Joao", "Victor"), 
            new Email("contato@example.com"),
            [new AddressVo("José Berlim", "Lages", "Uni", "88525860", "Brasil", "SC", true)], 
            [new Phone()],
            new Name("Joao", "Vsictor"),
            new Name("Joao", "Victor"), 
            new Cpf("00556100050"),
            new RgDocument("42.221.191-6"));
            person = repo.create({
                ...persona,
                Name: persona.Name.getFullName(),
                Email: persona.Email.email,
                FathersName: persona.FathersName.getFullName(),
                MothersName: persona.MothersName.getFullName(),
                Cpf: persona.Cpf.value,
                Rg: persona.Rg.value,
                Addresses: [...persona.Addresses.map(e => {
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
                Phones: [...persona.Phones],
                Tenant: tenant
            });
        await repo.save(person);
        
        
    });
    test("Deve criar usuario", async () => {
        const user = new UserDomanEntity(
            new Email("exemplo@exemplo.com.br"),
            'asdasdasd',
            new RoleDomainEntity('Admin', [Actions.manage]),
            person.Uuid,
        );
        const result = await repository.save(user);
        expect(result).toBe(true);
    })
    test("Deve paginar resultados", async () => {
        const result = await repository.find(1, 10, person.Tenant.Uuid);
        console.log(JSON.stringify(result.resultados))
        expect(result.resultados).toHaveLength(1);
    })

    afterAll(async () => {
        const srcPath = path.resolve(__dirname, '../../../../:memory');
        fs.unlinkSync(srcPath);
    })
})