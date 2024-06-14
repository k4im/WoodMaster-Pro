import { Body, Controller, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ICommandCreatePerson } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";
import SupplierDto from  'src/application/dto/supplier.dto';
import { Request, Response } from "express";
import {decode} from 'jsonwebtoken'
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import AuthGuard from "src/application/http/guards/auth.guard";


@Controller('establishment')
@ApiTags('establishment')
export default class CreateSupplierController {
    
    constructor(
        @Inject("ITenantRepository")
        private readonly tenantRepo: ITenantRepository,
        @Inject("ICreateSupplierUseCase")
        private readonly createSupplierUsecase: ICommandCreatePerson<SupplierDto, Tenant>,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ){}

    @Post('/:tenantId/supplier')
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'Rota utilizada para realizar a criação de um fornecedor.',
        description: `Rota poderá ser utilizada para realizar a operação de criação
        de um novo fornecedor.`,
    })
    @ApiResponse({status: 200, description: 'Resposta de sucesso ao realizar a criação do fornecedor.'})
    @ApiResponse({status: 500, description: 'Informa que houve um erro interno ao tentar realizar o processamento.'})
    @ApiResponse({status: 401, description: 'Caso o token nao seja informado.'})
    async handle(@Param() {tenantId}: any, res: Response, @Body() supplier: SupplierDto) {
        try {
            const tenant = await this.tenantRepo.findTenantByUuid(tenantId);
            const result = this.createSupplierUsecase.execute(supplier, tenant);
            result ? 
            res.status(200).send({message: 'supplier successfully created.'}) : 
            res.status(500).send({message: 'An internal error has ocurred.'})
        } catch (error) {
            this.logger.error(`Houve um erro no controlador de criar supplier: ${error}`)
        }
    }
}