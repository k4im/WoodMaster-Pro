import {Controller, Get, HttpStatus, Inject, Query, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import TenantDomainEntity from "src/domain/entities/tenant.domain";
import { ISingleCommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ITenantDto } from "src/application/dto/interfaces/ITenant.dto";
import AuthGuard from "src/application/http/guards/auth.guard";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { Role } from "src/application/enum/roles.enum";
import { Roles } from "src/application/decorators/role.decorator";

@Controller("admin")
@ApiTags("admin")
@ApiBearerAuth()
export default class FindTenantController { 
    
    constructor(
    @Inject("IFindTenant") 
    private readonly findTenantUseCase: ISingleCommandInterface<ITenantDto>,
    @Inject("LoggerGateway")
    private readonly Logger: LoggerGateway) {}
    
    @Get('tenant')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.root)
    @ApiOperation({
        summary: 
        'A rota poderá ser utilizada para efetuar a consulta de um tenant existente',
        description: `Para realizar a operação busca de um tenant poderá estar utilizando
        a rota em questão, onde deverá ser repassado o UUID do cliente para refeutar a
        consulta. **Objeto de resposta:**
        
        Uuid: string,
        Name: string,
        IsActive: boolean`    
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
    async handle(@Req() {query: {uuid}}: Request, @Res() res: Response) { 
        try {
            if(!uuid) 
                res.status(404).send({message: 'uuid param not found.'});
            console.log(uuid)
            const tenantResult = await this.findTenantUseCase.execute(`${uuid.toString()}`)
            if(!tenantResult) return res.status(404).send({message: 'Tenant Not Found.'});
            return res.status(200).send(tenantResult);
        } catch (error) {
            this.Logger.error(`Houve um erro ao tentar realizar a 
                chamada dentro do controller. ${error}`)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({message: error.message});
        }
    }
}