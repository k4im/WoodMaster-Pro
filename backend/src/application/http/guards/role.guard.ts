/**
 * Através desta guard será possivel validar
 * se o cliente autenticado possui o papel
 * dentro do sistema adequado para acesso a determinada rota.
 * 
 * Caso o mesmo nao possua, será negado o acesso ao controlador
 * e emitido uma resposta adequada http.
 * 
 * @author João Victor.
 */
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
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
        const cleanToken = authorization.replace("Bearer", '').trim();

        // decodifica o jwt.
        const {Role} = await this.service.decodeJwt(cleanToken);
        
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