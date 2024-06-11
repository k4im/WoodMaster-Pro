import { Controller, Inject, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ISingleCommandInterface } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";

@Controller('establishment')
@ApiTags('establishment')
@ApiBearerAuth()
export default class DeactiveCollaboratorController { 
    constructor(
        @Inject('deactivateCollab')
        private readonly deactivateCollabUseCase: ISingleCommandInterface<boolean>,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) {}
    
    @Post('collaborator/:tenantId/deactivate/:uuid')
    @ApiParam({name: 'uuid', 
    description: `UUID do colaborador que deseja desativar.`})
    @ApiParam({name: 'tenantId', 
    description: `UUID do tenant que deseja efetuar a operação.`})
    @ApiOperation({summary: 'Rota utilizada para desativar colaborador.', 
        description: `Podera ser utilizado para realizar a operação
        de inativação de um colaborador. Portanto caso a operação seja realizada o
        colaborador terá seu acesso congelado ao sistema.`
    })
    @ApiResponse({status: 200, description: 'Resposta de sucesso.'})
    @ApiResponse({status: 404, description: 'Colaborador não encontrado.'})
    @ApiResponse({status: 500, description: 'Resposta de erro interno.'})
    async handle(@Param() {uuid, tenantId}: any, res: Response) {
        try {
            const result = await this.deactivateCollabUseCase.execute(uuid, tenantId)
            result ? 
            res.status(200).send({message: 'collaborator deactivated.'}) : 
            res.status(500).send({message: 'An internal error has ocurred.'});
        } catch (error) {this.logger.error(error)}
    }
}