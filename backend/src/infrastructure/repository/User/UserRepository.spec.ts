import UserRepository from "./UserRepository";
import { DatabaseInMemory } from "src/infrastructure/database/databaseInMemory.service";
import { Test, TestingModule } from "@nestjs/testing";
import PersonDomainEntity from "src/domain/entities/person.domain";
import { Name } from "src/domain/valueObjects/nameVo/name.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Address as AddressVo } from "src/domain/valueObjects/AddressVo/address.value.object";
import { Phone } from "src/domain/valueObjects/phone.value.object";
import { Cpf } from "src/domain/valueObjects/cpfVo/cpf.value.object";
import { RgDocument } from "src/domain/valueObjects/rgVo/rg.value.object";

import * as fs from 'fs';
import * as path from 'path';
import UserDomanEntity from "src/domain/entities/user.domain";
import RoleDomainEntity from "src/domain/entities/role.domain";
import { Actions } from "src/domain/enum/permissoes.enum";
import { FakeLogger } from "src/infrastructure/logger/Fakelogger.service";
import RoleService from "src/infrastructure/services/role.service";
import { Role } from "src/domain/enum/roles.enum";
import { Person } from "src/domain/databaseEntities/Person.entity";
import { Tenant } from "src/domain/databaseEntities/Tenant.entity";
import { Address } from "src/domain/databaseEntities/Addresses.entity";
describe("UserRepository", () =>  {
    let repository: UserRepository;
    let database: DatabaseInMemory;
    let person: Person;
    let tenant: Tenant

    beforeEach(async () => { 
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepository, 
                {provide: "LoggerGateway", useClass: FakeLogger}, 
                {provide: "DatabaseGateway", useClass: DatabaseInMemory},
                {provide: "RoleService", useClass: RoleService}
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
            new RoleDomainEntity(Role.root, [Actions.manage]),
            person.Uuid,
        );
        const result = await repository.createNewUser(user);
        expect(result).toBe(true);
    })
    test("Deve paginar resultados", async () => {
        const result = await repository.paginateUsers(1, 10, person.Tenant.Uuid);
        expect(result.resultados).toHaveLength(1);
    })
    test("Deve buscar um unico resultado a partir de um uuid", async () => {
        const persons = await repository.paginateUsers(1, 10, person.Tenant.Uuid);
        const result = await repository.findUserByUuid(persons.resultados[0].Uuid, tenant.Uuid);
        expect(result.Uuid).toEqual(persons.resultados[0].Uuid)
    })
    
    /**O METODO DEVERÁ SER ATIVADO CASO QUEIRA RODAR O TESTE DE FORMA UNITÁRIA PARA VALIDAÇÃO */
    // afterAll(async () => {
    //     const srcPath = path.resolve(__dirname, '../../../../:memory');
    //     fs.unlinkSync(srcPath);
    // })
})