import { Controller, Get, HttpStatus, Inject, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { ICommandInterfacePaginate } from "src/application/usecases/Abstrations/ICoomands.interface";
import { ParamsPaginate } from "src/application/usecases/Abstrations/ParamsPaginate.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ResponseSwaggerDoc } from "src/application/usecases/administrator/docs/response.swagger.doc";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { ITenantDto } from "src/application/dto/interfaces/ITenant.dto";
import AuthGuard from "src/application/http/guards/auth.guard";
import AuthAdmGuard from "src/application/http/guards/authAdm.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Actions } from "src/application/enum/permissoes.enum";
import { TenantDto } from "src/application/dto/tenant.dto";
import { Roles } from "src/application/decorators/role.decorator";
import { Role } from "src/application/enum/roles.enum";
import { RolesGuard } from "src/application/http/guards/role.guard";

@Controller('admin')
@ApiTags('admin')
@ApiBearerAuth()
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
    @Roles(Role.root)
    @PermissionRequired({Action: [Actions.manage], Subject: 'all'})
    @UseGuards(AuthAdmGuard, PermissionGuard, RolesGuard)
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
    async handle(@Query() { page, limit }: ParamsPaginate, @Res() res: Response) { 
        try {
            const tenantResults = await this.listTenantUseCase.execute({page, limit});
            return tenantResults.resultados.length <= 0 ? 
                res.status(404).send({message: 'No Tenants found.'}): 
                res.status(200).send(tenantResults);
         
        } catch (error) {
            this.logger.error(error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({message: error.message});
        }
    }

}