import { Body, Controller, Get, Inject, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Roles } from "src/application/decorators/role.decorator";
import { newTenantDto } from "src/application/dto/interfaces/ITenant.dto";
import AuthMiddleware from "src/application/http/middlewares/auth.guard";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ICommandInterface } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";
import { tenantSwaggerDocs } from "src/domain/agregrators/usecases/administrator/docs/newTenant.swagger.doc";
import {Role as roles} from 'src/application/enum/roles.enum';
import { RolesMiddleware } from "src/application/http/middlewares/role.guard";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Actions } from "src/application/enum/permissoes.enum";
import { TenantDto } from "src/application/dto/tenant.dto";
import { PermissionMiddleware } from "src/application/http/middlewares/permissions.guard";

@ApiTags('admin')
@Controller('admin')
@ApiBearerAuth()
export class CreateTenantController  {
    constructor(
        @Inject('CreateTenant')
        private readonly createTenantUseCase: ICommandInterface<newTenantDto>,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) {}

    @Post('tenant')
    @Roles(roles.root)
    @PermissionRequired({Action: [Actions.manage, Actions.manage], Subject: TenantDto})
    @UseGuards(AuthMiddleware, RolesMiddleware, PermissionMiddleware)
    @ApiOperation({
        summary: 'Rota utilizada para criação de um novo tenant.',
        description: `Está rota poderá ser utilizado para efetuar a criação de
        um novo tenant.`,
    })
    @ApiBody({type: tenantSwaggerDocs})
    @ApiResponse({status: 200, description: 'resposta de sucesso.'})
    @ApiResponse({status: 500, description: 'Houve um erro ao tentar realizar a criação.'})
    async handle(@Body() tenant: newTenantDto, res: Response) { 
        try {
            const result = await this.createTenantUseCase.execute(tenant);
            result ? 
            res.status(201).send({message: 'new Tenant has been created.'}) : 
            res.status(500).send({message: 'An internal error has occurred.'})
        } catch (error) {this.logger.error(error)}
    }
}