import { Controller, Get, Inject, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IResponse } from "src/application/dto/IResponse.interface";
import { ITenantDto } from "src/application/dto/ITenant.dto";
import { Response } from "express";
import { ICommandInterfacePaginate } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";
import { ParamsPaginate } from "src/domain/agregrators/usecases/Abstrations/ParamsPaginate.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ResponseSwaggerDoc } from "src/domain/agregrators/usecases/administrator/docs/response.swagger.doc";

@Controller('admin')
@ApiTags('admin')
export default class ListTenantsController {

    constructor(
        @Inject('ListTenants')
        private readonly listTenantUseCase : 
        ICommandInterfacePaginate<
        ParamsPaginate, IResponse<ITenantDto>>,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) {}
    
    @Get('tenants')
    @ApiOperation({
        summary: `Efetua a busca de tenants que encontram-se cadastrados no banco de dados.`,
        description: `Estará realizando a busca de tenants que encontram-se presente no banco
        para isto será necessário estar realizando a passagem dos parametros de pagina e limite
        de resultado por pagina.
        **Objeto presente em resultados:** 

        Uuid: string,
        Name: string,
        IsActive: boolean`
    })
    @ApiQuery({
        name: 'page',
        description: `deverá ser passado a pagina para navegação na paginação`,
    })
    @ApiQuery({
        name: 'limit',
        description: 'limite de resultados que serão repassados por pagina.'
    })
    @ApiResponse({
        status: 200, 
        description: `retorno de sucesso ao realizar a requisição.`,
        type: ResponseSwaggerDoc
    })
    @ApiResponse({
        status: 404,
        description: 'Nenhum tenant encontrado.'
    })
    async handle(@Query() { page, limit }: ParamsPaginate, res: Response) { 
        try {
            const tenantResults = await this.listTenantUseCase.execute({page, limit});
            return tenantResults.resultados.length <= 0 ? 
                res.status(404).send({message: 'No Tenants found.'}): 
                res.status(200).send(tenantResults);
         
        } catch (error) {this.logger.error(error);}
    }

}