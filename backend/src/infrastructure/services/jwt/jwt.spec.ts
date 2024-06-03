import { Test, TestingModule } from "@nestjs/testing";
import JwtCustomService from "./JwtService";
import { JwtModule} from "@nestjs/jwt";

describe("jwt", () => {
    let service: JwtCustomService;
    
    beforeEach(async () => { 
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    global: false,
                    secret: 'testasdasdasd',
                    signOptions: {expiresIn: '1s'}
                  }),
            ],
            providers: [JwtCustomService]
        
        }).compile();
        service = module.get<JwtCustomService>(JwtCustomService)
    });
    
    it("Deve criar um jwt valido", async () => {
        const data = {Uuid: 'asdasd', Role: 'admin', Permissions: ['read', 'create', 'update', 'remove']};
        const token = await service.encodeJwt(data);
        expect(typeof(token)).toBe('string')
    });

    it("Deve retornar false para um token expirado", async() => {
        const data = {Uuid: 'asdasd', Role: 'admin', Permissions: ['read', 'create', 'update', 'remove']};
        const token = await service.encodeJwt(data);
        await new Promise(resolve => setTimeout(resolve, 3000));
        expect(await service.isExpire(token)).toBe(false);
    });
    
    it("Deve retornar true para um token valido", async() => {
        const data = {Uuid: 'asdasd', Role: 'admin', Permissions: ['read', 'create', 'update', 'remove']};
        const token = await service.encodeJwt(data);
        expect(await service.isExpire(token)).toBe(true);
    });
    
})