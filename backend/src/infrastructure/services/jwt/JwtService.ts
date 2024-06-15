import { Injectable } from "@nestjs/common";
import IJwtService from "./IJwtService";
import { JwtService } from "@nestjs/jwt";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { jwtDecoded } from "src/application/dto/interfaces/jwtDecoded.dto";
import { AdmPayloadToken, UserPayloadToken } from "src/application/dto/interfaces/IPayloadToken.dto";

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
            return false;
        }
    }
    /**
     * Codifica um novo token.
     * @param data recebe os dados para gerar um novo token
     * @returns string
     */
    async encodeJwt(data: AdmPayloadToken | UserPayloadToken): Promise<string> {
        const token = await this.jwtService.signAsync(data);
        return token;
    }
    
}