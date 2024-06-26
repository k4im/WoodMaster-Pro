import { Test, TestingModule } from "@nestjs/testing";
import TenantRepository from "./TenantRepository";
import { DatabaseInMemory } from "src/infrastructure/database/databaseInMemory.service";
import { FakeLogger } from "src/infrastructure/logger/Fakelogger.service";
import * as fs from 'fs';
import * as path from 'path';
import { ITenantDto } from "src/application/dto/interfaces/ITenant.dto";
import RoleService from "src/infrastructure/services/Role/role.service";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import Password from "src/domain/valueObjects/PasswordVo/password.value.object";


describe("tenant", () => {
    let repository: TenantRepository
    let TenatData: ITenantDto;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TenantRepository,
                { provide: "LoggerGateway", useClass: FakeLogger },
                { provide: "DatabaseGateway", useClass: DatabaseInMemory },
                { provide: "DatabaseGateway", useClass: DatabaseInMemory },
                {provide: 'IRoleService', useClass: RoleService}
            ]

        }).compile();
        repository = module.get<TenantRepository>(TenantRepository);
    });
    
    test("Deve criar um novo registro em banco e retornar true", async () => {
        const tenant = { Name: 'Tenant Geraldo', Email: new Email('teste@exemplo.com.br'), Password: new Password('Gn$5P4gs23@$%') };
        const result = await repository.createTenant(tenant);
        expect(result).toBe(true)
    });

    test("Deve paginar os resultados do banco", async () => {
        const result = await repository.paginatedTenants(1, 10);
        TenatData = result.resultados[0];
        const expected = result.resultados.length;
        expect(expected).toEqual(1)
    });
    
    test("Deve buscar o tenant pelo nome e retorna-lo", async() => {
        const result = await repository.findTenantByName(TenatData.Name);
        expect(result).toEqual(TenatData)
    });
    
    test("Deve buscar o tenant pelo uuid e retorna-lo", async() => {
        const result = await repository.findTenantByUuid(TenatData.Uuid);
        expect(result).not.toBeNull()
    });
    
    test("Deve desativar o tenant pelo uuid e retornar true", async() => {
        const result = await repository.deactiveTenant(TenatData.Uuid);
        expect(result).toEqual(true)
    });
    

    /**O METODO DEVERÁ SER ATIVADO CASO QUEIRA RODAR O TESTE DE FORMA UNITÁRIA PARA VALIDAÇÃO */
    afterAll(async () => {
        const srcPath = path.resolve(__dirname, '../../../../:memory');
        fs.unlinkSync(srcPath);
    })


})