import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import PersonDomainEntity from "src/domain/entities/person.domain";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ISingleCommandInterface } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";

@Controller('establishment')
@ApiTags('establishment')
export default class FindCollaboratorController { 
    constructor(
        @Inject("FindCollaborator")
        private readonly findCollaboratorUseCase: 
        ISingleCommandInterface<IPersonDto>,
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway
    ) {}

    @Get("collaborator/:tenantId/:uuid")
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
    @ApiResponse({status: 200, description: 'Resposta de sucesso.', type: PersonDomainEntity})
    @ApiResponse({status: 404, description: 'Resposta caso o colaborador nao foi encontrado.'})
    @ApiResponse({status: 500, description: 'Resposta caso ocorra um erro interno.'})
    async handle(@Param() {uuid, tenantId}: any, res: Response) {
        try {
            const collaborator = await this.findCollaboratorUseCase.execute(uuid, tenantId);
            if(!collaborator) 
                return res.status(404).send({message: 'collaborator not founded.'});
            return res.status(200).send(collaborator);
        } catch (error) {this.logger.error(error)};
    }
}