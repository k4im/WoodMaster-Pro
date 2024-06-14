import { Injectable } from "@nestjs/common";
import IJwtService from "./IJwtService";
import { JwtService } from "@nestjs/jwt";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { jwtDecoded } from "src/application/dto/interfaces/jwtDecoded.dto";

@Injectable()
export default class JwtCustomService implements IJwtService {
    constructor(
        private jwtService: JwtService
      ) {}
    
    /**
     * O metodo poderá ser utilizado para decodificar o resultado.
     * 
     * @param token recebe o token para decodificação
     * @returns string
     */
    async decodeJwt(token: string): Promise<jwtDecoded> {
        return this.jwtService.decode<jwtDecoded>(token);
    }

    /**
     * Valida se o token encontra-se valido.
     * @param token Recebe o token
     * @returns boolean
     */
    async isExpire(token: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(token);
            return false;
        } catch (error) {
            return true;
        }
    }
    /**
     * Codifica um novo token.
     * @param data recebe os dados para gerar um novo token
     * @returns string
     */
    async encodeJwt(data: any): Promise<string> {
        const payload = this.createPayload(data);
        const token = await this.jwtService.signAsync(payload);
        return token;
    }
    
    private createPayload(data: any) {
        if(data.Tenant) {
            const payload = {
                Uuid: data.Uuid,
                Role: data.Role,
                Tenant: data.Tenant,
                UserAgent: data.UserAgent,
                Email: data.Email
            }
            return payload;    
        }
        const payload = {
            Uuid: data.Uuid,
            Email: data.email,
            Role: 'root',
            UserAgent: data.UserAgent,
        }
        return payload;
    }
}