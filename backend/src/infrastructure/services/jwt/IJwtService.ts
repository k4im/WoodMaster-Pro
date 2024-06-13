import { jwtDecoded } from "src/application/dto/interfaces/jwtDecoded.dto";

export default interface IJwtService { 
    decodeJwt(token: string): Promise<jwtDecoded>;
    isExpire(token: string): Promise<boolean>;
    encodeJwt(data: any): Promise<string>;
}