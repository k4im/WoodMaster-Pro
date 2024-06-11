import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ICommandCreatePerson } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";
import SupplierDto from  'src/application/dto/supplier.dto';
import { Request, Response } from "express";
import {decode} from 'jsonwebtoken'
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";


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