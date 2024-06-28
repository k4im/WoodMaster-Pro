import { Controller, Get, Inject, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Request, Response } from "express";
import { ICommandInterfacePaginate } from "src/application/usecases/Abstrations/ICoomands.interface";
import { ParamsPaginate } from "src/application/usecases/Abstrations/ParamsPaginate.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ResponseSwaggerDoc } from "src/application/usecases/administrator/docs/response.swagger.doc";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";
import AuthGuard from "src/application/http/guards/auth.guard";

@Controller('establishment')
@ApiTags('collaborators')
@ApiBearerAuth()
export default class ListCollaboratorsController {

    constructor(
        @Inject('listCollaborators')
        private readonly listcollaboratorsUseCase:
            ICommandInterfacePaginate<ParamsPaginate, IResponse<IPersonDto>>,
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway
    ) { }

    @Get('collaborators')
    @UseGuards(AuthGuard)
    @ApiResponse({ status: 200, description: 'Resposta de sucesso.', type: ResponseSwaggerDoc })
    @ApiResponse({ status: 404, description: 'Resposta de lista de colaboradores vazia.' })
    @ApiResponse({ status: 500, description: 'Resposta erro interno.' })
    @ApiOperation({
        summary: 'Rota para realizar paginação de colaboradores de um tenant',
        description: `Rota poderá ser realizar para efetuar a paginação de colaboradores
        cadastrado para determinado cliente.`
    })
    @ApiQuery({ name: 'page', description: 'parametro que sera realizado para navegação das paginas.' })
    @ApiQuery({ name: 'limit', description: 'parametro que será utilizado para quantidade resultado por pagina.' })
    @ApiQuery({ name: 'tenantId', description: 'uuid de identificação do tenant.' })
    async handle(@Req() { query: { page, limit, tenantId } }: Request, @Res() res: Response) {
        const pageInt = parseInt(page.toString());
        const limitInt = parseInt(limit.toString());
        const tenant = tenantId.toString();
        const result = await this.listcollaboratorsUseCase.execute({ page: pageInt, limit: limitInt, tenantId: tenant });

        result.resultados.length <= 0 ?
            res.status(404).send({ message: 'collaborators not founded.' }) :
            res.status(200).send(result);
    }
}