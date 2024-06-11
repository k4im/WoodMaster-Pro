import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import JwtCustomService from "src/infrastructure/services/jwt/JwtService";

@Injectable()
export default class AuthMiddleware implements CanActivate {
    constructor(
        @Inject("JwtService")
        private readonly service: JwtCustomService
    )   {}
    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const { authorization } = request.headers;
        if(!authorization)
            return false;
        if(this.service.isExpire(authorization))
            return false;
        return true;
    } 
    
}