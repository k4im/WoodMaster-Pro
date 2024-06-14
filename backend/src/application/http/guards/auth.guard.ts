import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Request } from "express";
import IJwtService from "src/infrastructure/services/jwt/IJwtService";
import ExpectedHttpError from "src/application/types/expectedhttp.error";
@Injectable()
export default class AuthGuard implements CanActivate {
    
    constructor(
        @Inject("IJwtService")
        private readonly service: IJwtService
    ){}

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        // busca a request
        const request = context.switchToHttp().getRequest<Request>();
        const { authorization } = request.headers;
        const {Tenant} = await this.service.decodeJwt(authorization);
        
        if(Tenant !== request.params.tenantId)
            throw new ExpectedHttpError('Cannot acess data from another tenant.', 
            HttpStatus.FORBIDDEN);
        
        if(!authorization)
            throw new ExpectedHttpError('Token not informed.', 
            HttpStatus.UNAUTHORIZED);
            
        if(this.service.isExpire(authorization))
            throw new ExpectedHttpError('Token expired.', 
                HttpStatus.UNAUTHORIZED);
    
        return true;
    } 
    
}