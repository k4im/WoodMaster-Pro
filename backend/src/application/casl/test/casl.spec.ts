import { jwtDecoded } from "src/application/dto/interfaces/jwtDecoded.dto";
import AbilityFactory from "../providers/AbillityFactory.provider"
import { Test, TestingModule } from "@nestjs/testing";
import CaslModule from "../casl.module";
import { OrderDto } from "src/application/dto/order.dto";
import { Role } from "src/application/enum/roles.enum";
import { Actions } from "nest-casl";

describe('casl', () => { 
    let casl: AbilityFactory;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CaslModule]
        }).compile();
        casl = module.get<AbilityFactory>(AbilityFactory);
    });

    it('deve permitir usuario financeiro de efetuar leitura e efetuar update de dados do tenant.', async() => {
        const token: jwtDecoded = {
            Role: Role.finance, 
            Tenant: '12', 
            UserAgent: 'asd', 
            Uuid: 'asd', 
            Email: 'asd'};
        const abillity = casl.defineAbality(token);
        const order = new OrderDto('q', 'ordetype', 'addr', 'stats', 'obs', 'itens', '12')

        expect(abillity.can(Actions.read, order)).toBe(true)
        expect(abillity.can(Actions.create, order)).toBe(true)
        expect(abillity.can(Actions.update, order)).toBe(true)
    });

    it('não deve permitir usuario financeiro de efetuar leitura e efetuar update de dados de um tenant diferente.', async() => {
        const token: jwtDecoded = {
            Role: Role.finance, 
            Tenant: '13', 
            UserAgent: 'asd', 
            Uuid: 'asd', 
            Email: 'asd'};
        const abillity = casl.defineAbality(token);
        const order = new OrderDto('q', 'ordetype', 'addr', 'stats', 'obs', 'itens', '12')

        expect(abillity.can(Actions.read, order)).toBe(false)
        expect(abillity.can(Actions.create, order)).toBe(false)
        expect(abillity.can(Actions.update, order)).toBe(false)
    });

    it('deve permitir usuario admin de realizar todas as operações do sistema.', async() => {
        const token: jwtDecoded = {
            Role: Role.admin, 
            Tenant: '13', 
            UserAgent: 'asd', 
            Uuid: 'asd', 
            Email: 'asd'};
        const abillity = casl.defineAbality(token);

        expect(abillity.can(Actions.manage, 'all')).toBe(true)
    });

    it('não deve permitir usuarios diferente do admin de ter permissão manage.', async() => {
        const token: jwtDecoded = {
            Role: Role.stock, 
            Tenant: '13', 
            UserAgent: 'asd', 
            Uuid: 'asd', 
            Email: 'asd'};
        const abillity = casl.defineAbality(token);

        expect(abillity.can(Actions.manage, 'all')).toBe(false)
    });
    it('deve permitir usuario operador de realizar operações dentro de seu tenant.', async() => {
        const token: jwtDecoded = {
            Role: Role.operator, 
            Tenant: '13', 
            UserAgent: 'asd', 
            Uuid: 'asd', 
            Email: 'asd'};
        const abillity = casl.defineAbality(token);
        const order = new OrderDto('q', 'ordetype', 'addr', 'stats', 'obs', 'itens', '13')

        expect(abillity.can(Actions.read, order)).toBe(true)
        expect(abillity.can(Actions.update, order, 'Status')).toBe(true)
    });
    it('não deve permitir usuario operador de efetuar leitura e efetuar update de dados de um tenant diferente.', async() => {
        const token: jwtDecoded = {
            Role: Role.operator, 
            Tenant: '13', 
            UserAgent: 'asd', 
            Uuid: 'asd', 
            Email: 'asd'};
        const abillity = casl.defineAbality(token);
        const order = new OrderDto('q', 'ordetype', 'addr', 'stats', 'obs', 'itens', '12')

        expect(abillity.can(Actions.read, order)).toBe(false)
        expect(abillity.can(Actions.update, order)).toBe(false)
    });
    it('usuario root poderá realizar todas as operações dentro do sistema.', async() => {
        const token: jwtDecoded = {
            Role: Role.root, 
            UserAgent: 'asd', 
            Uuid: 'asd', 
            Email: 'asd'};
        const abillity = casl.defineAbality(token);
        
        expect(abillity.can(Actions.manage, 'all')).toBe(true)
    });
})
