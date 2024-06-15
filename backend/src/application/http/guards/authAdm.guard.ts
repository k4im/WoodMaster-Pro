import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import IJwtService from "src/infrastructure/services/jwt/IJwtService";
import ExpectedHttpError from "src/application/types/expectedhttp.error";
@Injectable()
export default class AuthAdmGuard implements CanActivate {
    
    constructor(
        @Inject("IJwtService")
        private readonly service: IJwtService
    ){}

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        // busca a request
        const request = context.switchToHttp().getRequest<Request>();
        const { authorization } = request.headers;
        if(!authorization)
            throw new ExpectedHttpError('Token not informed', 
            HttpStatus.UNAUTHORIZED);
        const cleanToken = authorization.replace("Bearer", '').trim();
        


        const {UserAgent} = await this.service.decodeJwt(cleanToken);
        
        if(UserAgent !== request.headers["user-agent"])
            throw new ExpectedHttpError('Invalid Token.', 
                HttpStatus.FORBIDDEN);
        
        if(!authorization)
            throw new ExpectedHttpError('Token not informed.', 
            HttpStatus.UNAUTHORIZED);
            
        if(await this.service.isExpire(cleanToken))
            throw new ExpectedHttpError('Token expired.', 
                HttpStatus.UNAUTHORIZED);
    
        return true;
    } 
    
}