import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ICommandInterface } from "../../Abstrations/ICoomands.interface";
import { newTenantDto } from "src/application/dto/ITenant.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { Response } from "express";
import { tenantSwaggerDocs } from "../docs/newTenant.swagger.doc";

@ApiTags('admin')
@Controller('admin')
export class CreateTenantController  {
    constructor(
        @Inject('CreateTenant')
        private readonly createTenantUseCase: ICommandInterface<newTenantDto>,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) {}

    @Post('tenant')
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