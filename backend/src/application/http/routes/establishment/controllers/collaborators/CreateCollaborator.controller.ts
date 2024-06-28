import { Body, Controller, Inject, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";
import CollaboratorDto from "src/application/dto/collaborator.dto";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";
import { Request, Response } from "express";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ICommandCreatePerson } from "src/application/usecases/Abstrations/ICoomands.interface";
import AuthGuard from "src/application/http/guards/auth.guard";
import { Roles } from "src/application/decorators/role.decorator";
import { Role } from "src/application/enum/roles.enum";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Actions } from "src/application/enum/permissoes.enum";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";

@Controller('establishment')
@ApiTags('establishment')
@ApiBearerAuth()
export default class CreateCollaboratorController {
    constructor(
        @Inject("ITenantRepository")
        private readonly tenantRepository: ITenantRepository,
        @Inject("CreateCollaborator")
        private readonly createCollaboratorUseCase: ICommandCreatePerson<CollaboratorDto, Tenant>,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) { }

    @Post('collaborator/:tenantId')
    @Roles(Role.admin, Role.root)
    @PermissionRequired({ Action: [Actions.manage], Subject: CollaboratorDto })
    @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
    @ApiOperation({
        summary: `Rota utilizada para realizar a criação de colaboradores.`,
        description: `Rota poderá ser utilizada para realizar a criação de novos colaboradores
        onde devera ser repassado por parametro de rota o id do tenant para realizar a operação.`
    })
    @ApiParam({
        name: 'tenantId',
        description: `Repassado o tenantId para realizar a operação de criação 
        do colaborador para determinado cliente.`
    })
    @ApiBody({ type: CollaboratorDto })
    @ApiResponse({ status: 200, description: 'resposta de sucesso.' })
    @ApiResponse({ status: 500, description: 'resposta de erro internal.' })
    async handle(@Req() { params: { tenantId } }: Request, @Body() collaborator: CollaboratorDto, @Res() res: Response) {
        const tenant = await this.tenantRepository.findTenantByUuid(tenantId);
        const result = await this.createCollaboratorUseCase.execute(collaborator, tenant)
        result ?
            res.status(200).send({ message: 'collaborator created sucessefully.' }) :
            res.status(500).send({ message: 'An internal error has ocurred.' });
    }
}