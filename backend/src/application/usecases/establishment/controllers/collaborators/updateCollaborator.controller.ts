import { Body, Controller, Inject, Param, Put } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import CollaboratorDto from "src/application/dto/collaborator.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ICommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";

@Controller('establishment')
@ApiTags('establishment')
export default class UpdateCollaboratorController { 
    constructor(
        @Inject('updateCollaborator')
        private readonly updateCollaboratorUseCase: 
        ICommandInterface<CollaboratorDto>,
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway
    ) {}

    @Put('collaborator/:tenantId/:uuid')
    @ApiOperation({
        summary: 'Rota utilizada para atualizar um colaborador.',
        description: `A rota poderá ser utilizada para efetuar
        a atualização de um colaborador, para isto será necessário
        informar o tenantId e o UUID do colaborador.`
    })
    @ApiParam({name: 'tenantId', description: 'UUID de identificação do tenant.'})
    @ApiParam({name: 'uuid', description: 'UUID de identificação do colaborador.'})
    @ApiResponse({status: 200, description: 'Resposta de sucesso.'})
    @ApiResponse({status: 500, description: 'Resposta erro interno.'})
    async handle(@Param() {tenantId, uuid}: any, @Body() updateCollaborator: CollaboratorDto, res: Response) {
        try {
            const updatedCollab = await this
            .updateCollaboratorUseCase
            .execute(updateCollaborator);

            updatedCollab ? 
            res.status(200).send({message: 'collaborator updated.'}) : 
            res.status(500).send({message: 'An internal error has ocurred.'});
        } catch (error) {this.logger.error(error)}
    }
}