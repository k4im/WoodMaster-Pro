import { Body, Controller, Get, HttpStatus, Inject, Post, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Roles } from "src/application/decorators/role.decorator";
import { newTenantDto } from "src/application/dto/interfaces/ITenant.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ICommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";
import { tenantSwaggerDocs } from "src/application/usecases/administrator/docs/newTenant.swagger.doc";
import {Role as roles} from 'src/application/enum/roles.enum';
import { RolesGuard } from "src/application/http/guards/role.guard";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Actions } from "src/application/enum/permissoes.enum";
import { TenantDto } from "src/application/dto/tenant.dto";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";
import AuthGuard from "src/application/http/guards/auth.guard";

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
    @PermissionRequired({Action: [Actions.create], Subject: TenantDto})
    @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
    @ApiOperation({
        summary: 'Rota utilizada para criação de um novo tenant.',
        description: `Está rota poderá ser utilizado para efetuar a criação de
        um novo tenant.`,
    })
    @ApiBody({type: tenantSwaggerDocs})
    @ApiResponse({status: 200, description: 'resposta de sucesso.'})
    @ApiResponse({status: 500, description: 'Houve um erro ao tentar realizar a criação.'})
    async handle(@Body() tenant: newTenantDto, @Res() res: Response) { 
        try {
            const result = await this.createTenantUseCase.execute(tenant);
            result ? 
            res.status(201).send({message: 'new Tenant has been created.'}) : 
            res.status(500).send({message: 'An internal error has occurred.'})
        } catch (error) {
            this.logger.error(error)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({message: error.message});
        }
    }
}