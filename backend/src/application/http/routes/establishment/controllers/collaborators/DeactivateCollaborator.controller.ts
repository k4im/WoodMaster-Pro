import { Controller, Inject, Param, Post, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Roles } from "src/application/decorators/role.decorator";
import CollaboratorDto from "src/application/dto/collaborator.dto";
import { Actions } from "src/application/enum/permissoes.enum";
import { Role } from "src/application/enum/roles.enum";
import AuthGuard from "src/application/http/guards/auth.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { ISingleCommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";

@Controller('establishment')
@ApiTags('collaborators')
@ApiBearerAuth()
export default class DeactiveCollaboratorController {
    constructor(
        @Inject('deactivateCollab')
        private readonly deactivateCollabUseCase: ISingleCommandInterface<boolean>,
    ) { }

    @Post('collaborator/:tenantId/deactivate/:uuid')
    @Roles(Role.admin, Role.root)
    @PermissionRequired({ Action: [Actions.remove], Subject: CollaboratorDto })
    @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
    @ApiParam({
        name: 'uuid',
        description: `UUID do colaborador que deseja desativar.`
    })
    @ApiParam({
        name: 'tenantId',
        description: `UUID do tenant que deseja efetuar a operação.`
    })
    @ApiOperation({
        summary: 'Rota utilizada para desativar colaborador.',
        description: `Podera ser utilizado para realizar a operação
        de inativação de um colaborador. Portanto caso a operação seja realizada o
        colaborador terá seu acesso congelado ao sistema.`
    })
    @ApiResponse({ status: 200, description: 'Resposta de sucesso.' })
    @ApiResponse({ status: 404, description: 'Colaborador não encontrado.' })
    @ApiResponse({ status: 500, description: 'Resposta de erro interno.' })
    async handle(@Param() { uuid, tenantId }: any, @Res() res: Response) {
        const result = await this.deactivateCollabUseCase.execute(uuid, tenantId)
        result ?
            res.status(200).send({ message: 'collaborator deactivated.' }) :
            res.status(500).send({ message: 'An internal error has ocurred.' });
    }
}