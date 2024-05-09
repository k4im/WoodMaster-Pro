import { Injectable } from "@nestjs/common";
import IJwtService from "./IJwtService";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class JwtCustomService implements IJwtService {
    constructor(
        private jwtService: JwtService
      ) {}
    async decodeJwt(token: string): Promise<string> {
        return this.jwtService.decode<string>(token);
    }
    async isExpire(token: string): Promise<boolean> {
        const value = await this.jwtService.verifyAsync(token);
        if(value ) return true;
        return false;
    }
    async encodeJwt(data: any): Promise<string> {
        return this.jwtService.signAsync(data);
    }

}