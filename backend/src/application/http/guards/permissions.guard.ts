import { ForbiddenError } from "@casl/ability";
import { CanActivate, ExecutionContext, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import AbilityFactory from "src/application/casl/providers/AbillityFactory.provider";
import { PERMISSION_KEY, subject } from "src/application/decorators/permission.decorator";
import CollaboratorDto from "src/application/dto/collaborator.dto";
import { TenantDto } from "src/application/dto/tenant.dto";
import ExpectedHttpError from "src/application/types/expectedhttp.error";
import IJwtService from "src/infrastructure/services/jwt/IJwtService";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly abillityFactory: AbilityFactory,        
        @Inject("IJwtService")
        private readonly service: IJwtService,
    ) {}
    
    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        // pega a request.
        const request = context.switchToHttp()
        .getRequest<Request>();
        
        // puxa o token do authorization.
        const {authorization} = request.headers;
        const cleanToken = authorization.replace("Bearer", '').trim();

        // Puxa as permissões dentro do token.
        const token = await this.service.decodeJwt(cleanToken);
        const abillity = this.abillityFactory.defineAbality(token);
        
        // busca os valores repassados no decorador.  
        const {Action, Subject} = this.reflector
        .getAllAndOverride<subject>(PERMISSION_KEY, [
            context.getHandler(), context.getClass()]);
        
        // caso a rota nao tenha permissions
        // podera efetuar acesso normalmente.
        if(!Action)
            return true;
        
        // Verifica se o usuario pode efetuar todas as ações
        // presentes dentro do decorator.
        try {
            Action.forEach(perm => {
                ForbiddenError.from(abillity).throwUnlessCan(perm, Subject)
            })
            return true
        } catch (error) {
            if(error instanceof ForbiddenError)
                throw new ExpectedHttpError("Forbidden.", HttpStatus.FORBIDDEN);
        }
    }
    
}