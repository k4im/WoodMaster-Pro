import { Injectable } from "@nestjs/common";
import IJwtService from "./IJwtService";
import { JwtService } from "@nestjs/jwt";

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
    async decodeJwt(token: string): Promise<string> {
        return this.jwtService.decode<string>(token);
    }

    /**
     * Valida se o token encontra-se valido.
     * @param token Recebe o token
     * @returns boolean
     */
    async isExpire(token: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(token);
            return true;
        } catch (error) {
            return false;
        }
    }
    /**
     * Codifica um novo token.
     * @param data recebe os dados para gerar um novo token
     * @returns string
     */
    async encodeJwt(data: any): Promise<string> {
        const payload = {
            Uuid: data.Uuid,
            Role: data.Role,
            Permissons: data.Permissions,
            Tenant: data.Tenant
        }
        const token = await this.jwtService.signAsync(payload);
        return token;
    }

}