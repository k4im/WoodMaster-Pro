import { Body, Controller, HttpStatus, Inject, Param, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import CollaboratorDto from "src/application/dto/collaborator.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ICommandInterface } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";
import AuthGuard from "src/application/http/guards/auth.guard";


@Controller('establishment')
@ApiTags('establishment')
@ApiBearerAuth()
export default class UpdateCollaboratorController { 
    constructor(
        @Inject('updateCollaborator')
        private readonly updateCollaboratorUseCase: 
        ICommandInterface<CollaboratorDto>,
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway
    ) {}

    @Put('collaborator/:tenantId/:uuid')
    @UseGuards(AuthGuard)
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
    async handle(@Param() {uuid}: any, @Body() updateCollaborator: CollaboratorDto, res: Response) {
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