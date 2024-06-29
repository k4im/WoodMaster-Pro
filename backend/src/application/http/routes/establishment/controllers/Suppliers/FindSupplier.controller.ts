import { Controller, Get, HttpException, HttpStatus, Inject, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags, OmitType } from "@nestjs/swagger";
import { Request, Response } from "express";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Roles } from "src/application/decorators/role.decorator";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";
import SupplierDto from "src/application/dto/supplier.dto";
import { Actions } from "src/application/enum/permissoes.enum";
import { Role } from "src/application/enum/roles.enum";
import AuthGuard from "src/application/http/guards/auth.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { ISingleCommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";
import { Address } from "src/domain/valueObjects/AddressVo/address.value.object";

@Controller('establishment')
@ApiTags('supplier')
@ApiBearerAuth()
export default class FindSupplierByUuidController {

    constructor(
        @Inject('IFindSupplierByUuidUseCase')
        private readonly findSupplierUseCase: ISingleCommandInterface<IPersonDto>
    ) { }

    @Get('supplier/:tenantId/:uuid')
    @Roles(Role.admin, Role.root, Role.finance)
    @PermissionRequired({ Action: [Actions.read], Subject: SupplierDto })
    @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
    @ApiOperation({
        summary: 'Rota utilizada para estar realizandoa a busca de determinado fornecedor.',
        description: `Através desta rota será possivel estar realizando a operação de busca
        de um determinado fornecedor baseando-se no seu uuid.`
    })
    @ApiParam({
        name: 'tenantId',
        description: 'Parametro utilizado para identificar o tenant.'
    })
    @ApiParam({
        name: 'uuid',
        description: 'Parametro utilizado para identificar o fornecedor.'
    })
    @ApiResponse({status: 200, description: 'Resposta de sucesso.'})
    @ApiResponse({status: 400, description: 'Resposta de request mal formatada.'})
    @ApiResponse({status: 404, description: 'Resposta caso o fornecedor nao seja encontrado.'})
    async handle(@Req() { params: { tenantId, uuid } }: Request, @Res() res: Response) {
        if (!tenantId && !uuid)
            throw new HttpException('Parameters not informed.',
                HttpStatus.BAD_REQUEST);
        const supplier = await this.findSupplierUseCase.execute(uuid.toString(), tenantId.toString());
        
        if (!supplier)
            throw new HttpException('Supplier not founded.',
                HttpStatus.NOT_FOUND);
        
        return res.status(HttpStatus.OK).send(supplier);
    }
}