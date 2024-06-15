import { Test, TestingModule } from "@nestjs/testing";
import JwtCustomService from "./JwtService";
import { JwtModule} from "@nestjs/jwt";
import { UserPayloadToken } from "src/application/dto/interfaces/IPayloadToken.dto";

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
        const data: UserPayloadToken = {Uuid: 'asdasd', Role: 'admin',Email: '', Tenant: '', UserAgent: ''};
        const token = await service.encodeJwt(data);
        expect(typeof(token)).toBe('string')
    });

    it("Deve retornar true para um token expirado", async() => {
        const data: UserPayloadToken = {Uuid: 'asdasd', Role: 'admin',Email: '', Tenant: '', UserAgent: ''};
        const token = await service.encodeJwt(data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        expect(await service.isExpire(token)).toBe(true);
    });
    
    it("Deve retornar false para um token valido", async() => {
        const data: UserPayloadToken = {Uuid: 'asdasd', Role: 'admin',Email: '', Tenant: '', UserAgent: ''};
        const token = await service.encodeJwt(data);
        expect(await service.isExpire(token)).toBe(false);
    });
    
})