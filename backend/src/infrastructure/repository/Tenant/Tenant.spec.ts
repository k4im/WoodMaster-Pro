import { Test, TestingModule } from "@nestjs/testing";
import TenantRepository from "./TenantRepository";
import { DatabaseInMemory } from "src/infrastructure/database/databaseInMemory.service";
import { FakeLogger } from "src/infrastructure/logger/Fakelogger.service";
import * as fs from 'fs';
import * as path from 'path';
import { ITenantDto } from "src/application/dto/ITenant.dto";


describe("tenant", () => {
    let repository: TenantRepository
    let TenatData: ITenantDto;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TenantRepository,
                { provide: "LoggerGateway", useClass: FakeLogger },
                { provide: "DatabaseGateway", useClass: DatabaseInMemory },
            ]

        }).compile();
        repository = module.get<TenantRepository>(TenantRepository);
    });
    
    test("Deve criar um novo registro em banco e retornar true", async () => {
        const tenant = { Name: 'Tenant Geraldo' };
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