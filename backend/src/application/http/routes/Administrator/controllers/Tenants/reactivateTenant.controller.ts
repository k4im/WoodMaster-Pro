import { Controller, HttpStatus, Inject, Param, Post, Query, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { Roles } from "src/application/decorators/role.decorator";
import AuthMiddleware from "src/application/http/guards/auth.guard";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ISimpleCommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";
import { Role as roles } from 'src/application/enum/roles.enum';
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Actions } from "src/application/enum/permissoes.enum";
import { TenantDto } from "src/application/dto/tenant.dto";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";
import AuthGuard from "src/application/http/guards/auth.guard";


@Controller('admin')
@ApiTags('admin')
@ApiBearerAuth()
export default class ReactivateTenantController {
    constructor(
        @Inject("ReactivateTenant")
        private readonly reactivateTenantUseCase: ISimpleCommandInterface,
    ) { }

    @Post('tenant/reactivate')
    @Roles(roles.root)
    @PermissionRequired({ Action: [Actions.manage], Subject: TenantDto })
    @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
    @ApiQuery({
        name: 'uuid',
        description: 'deverá ser repassado na rota o uuid do tenant.',
        example: "4ece8486-4011-4beb-ad1e-c3ed011d00cf"
    })
    @ApiOperation({
        summary: `rota utilizada para realizar a operação de reativar um tenant.`,
        description: `Rota poderá ser utilizada para **reativa** um tenant que 
        encontra-se presente na base de dados. Após o tenant ser desativado o mesmo
        não poderá mais efetuar login no sistema.`
    })
    async handle(@Req() { query: { uuid } }: Request, @Res() @Res() res: Response) {
        const result = await this.reactivateTenantUseCase.execute(`${uuid}`);
        result ?
            res.status(200)
                .send({ message: 'tenant reactivated' }) :
            res.status(500)
                .send({ message: 'An internal error has ocurred.' });
    }
}