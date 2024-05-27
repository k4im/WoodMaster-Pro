import {Controller, Get, Inject, Query } from "@nestjs/common";
import { ISingleCommandInterface } from "../../Abstrations/ICoomands.interface";
import { ITenantDto } from "src/application/dto/ITenant.dto";
import { Response } from "express";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import TenantDomainEntity from "src/domain/entities/tenant.domain";

@Controller("admin")
@ApiTags("admin")
export default class FindTenantController { 
    
    constructor(
    @Inject("IFindTenant") 
    private readonly findTenantUseCase: ISingleCommandInterface<ITenantDto>,
    @Inject("LoggerGateway")
    private readonly Logger: LoggerGateway) {}
    
    @Get('findUnique/Tenant')
    @ApiOperation({
        summary: 
        'A rota poderá ser utilizada para efetuar a consulta de um tenant existente',
        description: `Para realizar a operação busca de um tenant poderá estar utilizando
        a rota em questão, onde deverá ser repassado o UUID do cliente para refeutar a
        consulta.`    
    })
    @ApiQuery({
        name: 'uuid',
        required: true,
        description: 
        `Deverá ser repassado o UUID do tenant que encontra-se ativo
        dentro do sistema, para que então seja possivel efetuar
        a operação de busca do mesmo.`,
        example: "4ece8486-4011-4beb-ad1e-c3ed011d00cf"
    })
    @ApiResponse({status: 200, description: 'Resposta de sucesso', type: TenantDomainEntity})
    @ApiResponse({status: 404, description: 'uuid not found ou  Tenant Not Found'})
    async handle(@Query() uuid: string, res: Response) { 
        try {
            if(!uuid) 
                res.status(404).send({message: 'uuid param not found.'});
            const tenantResult = await this.findTenantUseCase.execute(uuid)
            if(!tenantResult) res.status(404).send({message: 'Tenant Not Found.'});
            res.status(200).send(tenantResult);
        } catch (error) {
            this.Logger.error(`Houve um erro ao tentar realizar a 
                chamada dentro do controller. ${error}`)
        }
    }
}