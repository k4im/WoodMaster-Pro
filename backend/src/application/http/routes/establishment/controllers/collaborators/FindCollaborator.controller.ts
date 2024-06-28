import { Controller, Get, Inject, Param, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import PersonDomainEntity from "src/domain/entities/person.domain";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ISingleCommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";
import AuthGuard from "src/application/http/guards/auth.guard";
import { Roles } from "src/application/decorators/role.decorator";
import { Role } from "src/application/enum/roles.enum";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Actions } from "src/application/enum/permissoes.enum";
import CollaboratorDto from "src/application/dto/collaborator.dto";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";

@Controller('establishment')
@ApiTags('establishment')
@ApiBearerAuth()
export default class FindCollaboratorController {
    constructor(
        @Inject("FindCollaborator")
        private readonly findCollaboratorUseCase:
            ISingleCommandInterface<IPersonDto>,
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway
    ) { }

    @Get("collaborator/:tenantId/:uuid")
    @Roles(Role.admin, Role.root)
    @PermissionRequired({ Action: [Actions.remove], Subject: CollaboratorDto })
    @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
    @ApiOperation({
        summary: 'A rota poderá ser utilizada para busca de um colaborador.',
        description: `Poderá estar realizando acesso a determinado colaborador
        de um determinado tenant.`
    })
    @ApiParam({
        name: 'uuid',
        description: `uuid do colaborador que deseja
        realizar a operação de busca.`
    })
    @ApiParam({
        name: 'tenantId',
        description: `uuid de identificação
        do tenant.`
    })
    @ApiResponse({ status: 200, description: 'Resposta de sucesso.', type: PersonDomainEntity })
    @ApiResponse({ status: 404, description: 'Resposta caso o colaborador nao foi encontrado.' })
    @ApiResponse({ status: 500, description: 'Resposta caso ocorra um erro interno.' })
    async handle(@Req() { params: { uuid, tenantId } }: Request, @Res() res: Response) {
        const collaborator = await this.findCollaboratorUseCase.execute(uuid, tenantId);
        if (!collaborator)
            return res.status(404).send({ message: 'collaborator not founded.' });
        return res.status(200).send(collaborator);
    }
}