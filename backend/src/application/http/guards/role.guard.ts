import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/application/decorators/role.decorator";
import { Role } from "src/application/enum/roles.enum";
import IJwtService from "src/infrastructure/services/jwt/IJwtService";

@Injectable()
export class RolesGuard implements CanActivate {
    
    constructor(
        private readonly reflector: Reflector,
        @Inject("IJwtService")
        private readonly service: IJwtService
    ) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // busca o request 
        const request = context.switchToHttp().getRequest<Request>();
        // extrai apenas os dados de authorization.
        const {authorization} = request.headers;
        // decodifica o jwt.
        const {Role} = await this.service.decodeJwt(authorization);
        
        // busca no decorator todos os valores repassados.
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(), context.getClass()]);
        
            // caso não exista papeis utilizados ele segue a request.
        if(!requiredRoles) 
            return true;

        // verifica se os papeis do token possuem o papel repassado.
        return requiredRoles.some((role) => Role.includes(role));
    }
}