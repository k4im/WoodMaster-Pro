import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import AuthService from "./auth.service";
import UserRepository from "src/infrastructure/repository/User/UserRepository";
import { FakeLogger } from "src/infrastructure/logger/Fakelogger.service";
import JwtCustomService from "../jwt/JwtService";
import { DatabaseInMemory } from "src/infrastructure/database/databaseInMemory.service";
import RoleService from "../Role/role.service";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";
import { Person } from "src/infrastructure/database/models/Person.entity";
import PersonDomainEntity from "src/domain/entities/person.domain";
import { Name } from "src/domain/valueObjects/nameVo/name.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Address as AddressVo } from "src/domain/valueObjects/AddressVo/address.value.object";
import { Phone } from "src/domain/valueObjects/phone.value.object";
import { Cpf } from "src/domain/valueObjects/cpfVo/cpf.value.object";
import { RgDocument } from "src/domain/valueObjects/rgVo/rg.value.object";
import { Address } from "src/infrastructure/database/models/Addresses.entity";
import UserDomanEntity from "src/domain/entities/user.domain";
import RoleDomainEntity from "src/domain/entities/role.domain";
import { Role } from "src/application/enum/roles.enum";
import { Actions } from "src/application/enum/permissoes.enum";

import * as fs from 'fs';
import * as path from 'path';
import TenantRepository from "src/infrastructure/repository/Tenant/TenantRepository";
import { Repository } from "typeorm";

describe("Auth", () => {
    let service: AuthService
    let repository: UserRepository;
    let tenant: Tenant;
    let person: Person;
    let database: DatabaseInMemory;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    global: false,
                    secret: 'testasdasdasd',
                    signOptions: {expiresIn: '1s'}
                  }),
            ],
            providers: [AuthService, UserRepository, DatabaseInMemory,
                {provide: "RoleService", useClass: RoleService},
                {provide: "DatabaseGateway", useClass: DatabaseInMemory},
                {provide: "ITenantRepository", useClass: TenantRepository},
                {provide: "IUserRepository", useClass: UserRepository},
                {provide: "LoggerGateway", useClass: FakeLogger},
                {provide: "IJwtService", useClass: JwtCustomService},
                {provide: 'IRoleService', useClass: RoleService}

            ]
        
        }).compile();
        service = module.get<AuthService>(AuthService)
        repository = module.get<UserRepository>(UserRepository);

        database = module.get<DatabaseInMemory>(DatabaseInMemory);
        const db = await database.getDataSource();
        const repo = db.getRepository(Person);
        const repoTenant = db.getRepository(Tenant);
        tenant = repoTenant.create({
            Name: "Tenant Geraldo",
        });
        await repoTenant.save(tenant);

        const persona = new PersonDomainEntity(
            new Name("Joao", "Victor"), 
            new Email("contato@examplade.com"),
            [new AddressVo("José Berlim", "Lages", "Uni", "88525860", "Brasil", "SC", true)], 
            [new Phone()],
            new Name("Joao", "Vsictor"),
            new Name("Joao", "Victor"), 
            new Cpf("07876267084"),
            new RgDocument("33.587.494-0"));
            
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
        await db.destroy();
        const user = new UserDomanEntity(
            "auth@exemplo.com.br",
            'Gn$5P4gs23@$%',
            Role.suport,
            person.Uuid,
        );
        await repository.createNewUser(user);
    });

    test("Ao logar o usuario com as credenciais corretas, deverá estar emitindo um token de acesso.", async () => {
        const token = await service.login("auth@exemplo.com.br", "Gn$5P4gs23@$%", '');
        expect(typeof(token)).toBe('string')
    });

    test("Ao tentar logar o usuario com credenciais erradas, deverá gerar uma exceção", async () => {
        await expect(service.login("auth@exemplo.com.br", "asdasdassd", '')).rejects.toThrow("Senha ou usuário incorretos.")        
    });
    test("Ao tentar logar o usuario de um tenant desativado, deverá gerar uma exceção", async () => {
        const db = await database.getDataSource();
        await db.getRepository(Tenant).update({Uuid: tenant.Uuid}, {IsActive: false});
        database.closeConnection(db);
        await expect(service.login("auth@exemplo.com.br", "Gn$5P4gs23@$%", '')).rejects.toThrow("Senha ou usuário incorretos.")        
    });

    /**O METODO DEVERÁ SER ATIVADO CASO QUEIRA RODAR O TESTE DE FORMA UNITÁRIA PARA VALIDAÇÃO */
    // afterAll(async () => {
    //     const srcPath = path.resolve(__dirname, '../../../../:memory');
    //     fs.unlinkSync(srcPath);
    // })
})