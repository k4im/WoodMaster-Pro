import { Body, Controller, Get, HttpStatus, Inject, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Roles } from "src/application/decorators/role.decorator";
import AdminDto from "src/application/dto/adm.dto";
import { Actions } from "src/application/enum/permissoes.enum";
import { Role } from "src/application/enum/roles.enum";
import AuthAdmGuard from "src/application/http/guards/authAdm.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ICommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";

@Controller('admin')
@ApiTags('admin')
@ApiBearerAuth()
export default class CreateAdministratorController {
    constructor(
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway,
        @Inject('ICreateAdmUseCase')
        private readonly createAdmUseCase: ICommandInterface<AdminDto>
    ) { }
    @Post('administrator')
    @Roles(Role.root)
    @PermissionRequired({ Action: [Actions.manage], Subject: 'all' })
    @UseGuards(AuthAdmGuard, RolesGuard, PermissionGuard)
    @ApiOperation({
        summary: 'Rota utilizada para efetuar a criação de um novo administrador.',
        description: `A rota poderá ser utilizada para realizar a criação de um administrador.
        para isto será necessário informar o endereço de email do administrador assim como a senha para acesso.
        Após realizada a criação do administrador será possivel efetuar o login na rota de auth do controlador de adm.`
    })
    @ApiResponse({ status: 200, description: 'Resposta de sucesso.' })
    @ApiResponse({ status: 500, description: 'Resposta de erro interno.' })
    async handle(@Body() data: AdminDto, @Res() res: Response) {
        const result = await this.createAdmUseCase.execute(data);
        result ?
            res.status(200).send({ message: 'Administrator added.' }) :
            res.status(500).send({ message: 'An internal error has ocurred.' })
    }
}