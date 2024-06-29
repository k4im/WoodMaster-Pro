import { Controller, Get, HttpException, HttpStatus, Inject, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Roles } from "src/application/decorators/role.decorator";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";
import SupplierDto from "src/application/dto/supplier.dto";
import { Actions } from "src/application/enum/permissoes.enum";
import { Role } from "src/application/enum/roles.enum";
import AuthGuard from "src/application/http/guards/auth.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { ICommandInterfacePaginate } from "src/application/usecases/Abstrations/ICoomands.interface";
import { ParamsPaginate } from "src/application/usecases/Abstrations/ParamsPaginate.interface";
import { ResponseSwaggerDoc } from "src/application/usecases/administrator/docs/response.swagger.doc";

@Controller('establishment')
@ApiTags('supplier')
@ApiBearerAuth()
export default class ListSupplierController {
    constructor(
        @Inject('IListSupplierUseCase')
        private readonly listSupplierUseCases: ICommandInterfacePaginate<ParamsPaginate, IResponse<IPersonDto>>
    ) { }

    @Get('supplier/:tenantId')
    @Roles(Role.admin, Role.root, Role.finance, Role.stock)
    @PermissionRequired({ Action: [Actions.read], Subject: SupplierDto })
    @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
    @ApiOperation({
        summary: 'Rota utilizada para efetuar a listagem de fornecedores de um determinado tenant.',
        description: `Através desta rota será possivel estar realizando a operação de listagem de todos os
        fornecedores relacionados a um determinado tenant de forma paginada.`
    })
    @ApiParam({
        name: 'tenantId',
        description: 'Parametro de rota para identificação do Tenant.'
    })
    @ApiQuery({
        name: 'page',
        description: 'Parametro para identificar a pagina de visualização.'
    })
    @ApiQuery({
        name: 'limit',
        description: 'Parametro para identificar o limite de resultado por pagina.'
    })
    @ApiResponse({ status: 400, description: 'Resposta caso seja realizada uma request incorreta.' })
    @ApiResponse({ status: 404, description: 'Resposta caso não seja identificado fornecedores.' })
    @ApiResponse({ status: 200, description: 'Resposta de sucesso.', type: ResponseSwaggerDoc })
    async handle(@Req() req: Request, @Res() res: Response) {
        if (!req.params.tenantId)
            throw new HttpException('Inform the tenantId.',
                HttpStatus.BAD_REQUEST);

        if (!req.query.page && !req.query.limit)
            throw new HttpException('Params not founded.',
                HttpStatus.BAD_REQUEST);

        const page = parseInt(req.query.page.toString());
        const tenant = req.params.tenantId.toString();
        const limit = parseInt(req.query.limit.toString());
        const listOfSuppliers = await this.listSupplierUseCases
            .execute({ page: page, limit: limit, tenantId: tenant })
        console.log(listOfSuppliers)
        if (listOfSuppliers.resultados.length <= 0)
            throw new HttpException('Suppliers not founded.',
                HttpStatus.NOT_FOUND);

        return res.status(HttpStatus.OK).send(listOfSuppliers);
    }
}