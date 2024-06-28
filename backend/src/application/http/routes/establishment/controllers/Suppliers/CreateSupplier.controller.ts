import { Body, Controller, Inject, Param, Post, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ICommandCreatePerson } from "src/application/usecases/Abstrations/ICoomands.interface";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";
import SupplierDto from 'src/application/dto/supplier.dto';
import { Response } from "express";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import AuthAdmGuard from "src/application/http/guards/authAdm.guard";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";
import { Roles } from "src/application/decorators/role.decorator";
import { Role } from "src/application/enum/roles.enum";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Actions } from "src/application/enum/permissoes.enum";


@Controller('establishment')
@ApiTags('supplier')
export default class CreateSupplierController {

    constructor(
        @Inject("ITenantRepository")
        private readonly tenantRepo: ITenantRepository,
        @Inject("ICreateSupplierUseCase")
        private readonly createSupplierUsecase: ICommandCreatePerson<SupplierDto, Tenant>,
    ) { }

    @Post('/:tenantId/supplier')
    @Roles(Role.admin, Role.root)
    @PermissionRequired({Action: [Actions.create], Subject: SupplierDto})
    @UseGuards(AuthAdmGuard, RolesGuard, PermissionGuard)
    @ApiOperation({
        summary: 'Rota utilizada para realizar a criação de um fornecedor.',
        description: `Rota poderá ser utilizada para realizar a operação de criação
        de um novo fornecedor.`,
    })
    @ApiResponse({ status: 200, description: 'Resposta de sucesso ao realizar a criação do fornecedor.' })
    @ApiResponse({ status: 500, description: 'Informa que houve um erro interno ao tentar realizar o processamento.' })
    @ApiResponse({ status: 401, description: 'Caso o token nao seja informado.' })
    async handle(@Param() { tenantId }: any, @Body() supplier: SupplierDto, @Res() res: Response) {
        const tenant = await this.tenantRepo.findTenantByUuid(tenantId);
        const result = this.createSupplierUsecase.execute(supplier, tenant);
        result ?
            res.status(200).send({ message: 'supplier successfully created.' }) :
            res.status(500).send({ message: 'An internal error has ocurred.' })
    }
}