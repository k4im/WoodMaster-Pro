import { jwtDecoded } from "src/application/dto/interfaces/jwtDecoded.dto";
import AbilityFactory from "../providers/AbillityFactory.provider"
import { Test, TestingModule } from "@nestjs/testing";
import CaslModule from "../casl.module";
import { OrderDto } from "src/application/dto/order.dto";
import { Role } from "src/application/enum/roles.enum";

describe('casl', () => { 
    let casl: AbilityFactory;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CaslModule]
        }).compile();
        casl = module.get<AbilityFactory>(AbilityFactory);
    });
    it('should make it work', async() => {
        const token: jwtDecoded = {
            Role: Role.finance, 
            Tenant: '12', 
            UserAgent: 'asd', 
            Uuid: 'asd', 
            Email: 'asd'};
        const teste = casl.defineAbality(token);
        const order = new OrderDto('q', 'ordetype', 'addr', 'stats', 'obs', 'itens', '12')

        console.log(teste.can('update', order)) // retorna true
    })
})