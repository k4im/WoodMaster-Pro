import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import ITenantRepository from "src/infrastructure/repository/abstraction/ITenantRepository.interface";
import { ICommandCreatePerson } from "../../Abstrations/ICoomands.interface";
import CollaboratorDto from "src/application/dto/collaborator.dto";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";
import { Response } from "express";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";

@Controller('establishment')
@ApiTags('establishment')
export default class CreateCollaboratorController { 
    constructor(
        @Inject("ITenantRepository")
        private readonly tenantRepository: ITenantRepository,
        @Inject("CreateCollaborator")
        private readonly createCollaboratorUseCase: ICommandCreatePerson<CollaboratorDto, Tenant>,
        @Inject("LoggerGateway") 
        private readonly logger: LoggerGateway
    ){}
    @Post('collaborator/:tenantId')
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
    @ApiBody({type: CollaboratorDto})
    @ApiResponse({status: 200, description: 'resposta de sucesso.'})
    @ApiResponse({status: 500, description: 'resposta de erro internal.'})
    async handle(@Param() tenantId: string, @Body() collaborator: CollaboratorDto, res: Response) {
        try {
            const tenant = await this.tenantRepository.findTenantByUuid(tenantId);
            const result = await this.createCollaboratorUseCase.execute(collaborator, tenant)
            result ? 
            res.status(200).send({message: 'collaborator created sucessefully.'}) : 
            res.status(500).send({message: 'An internal error has ocurred.'});
        } catch (error) {this.logger.error(error)}
    }
}