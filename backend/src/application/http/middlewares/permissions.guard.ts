import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { PERMISSION_KEY } from "src/application/decorators/permission.decorator";
import { Actions } from "src/application/enum/permissoes.enum";
import IJwtService from "src/infrastructure/services/jwt/IJwtService";

@Injectable()
export class PermissionMiddleware implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        @Inject("IJwtService")
        private readonly service: IJwtService
    ) {}
    
    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        // pega a request.
        const request = context.switchToHttp()
        .getRequest<Request>();
        // puxa o token do authorization.
        const {authorization} = request.headers;
        // Puxa as permissões dentro do token.
        const {Permissons} = await this.service.decodeJwt(authorization);
        
        // busca os valores repassados no decorador.  
        const requiredPermissions = this.reflector
        .getAllAndOverride<Actions[]>(PERMISSION_KEY, [
            context.getHandler(), context.getClass()]);
        
        // caso a rota nao tenha permissions
        // podera efetuar acesso normalmente.
        if(!requiredPermissions)
            return true;

        return requiredPermissions.every((perm) => Permissons.includes(perm));
    }
    
}