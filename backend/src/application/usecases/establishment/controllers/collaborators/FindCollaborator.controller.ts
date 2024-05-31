import { Controller, Get, Inject, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { IPersonDto } from "src/application/dto/Person.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ISingleCommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";

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
    async handle(@Param() {uuid, tenantId}: any, res: Response) {
        try {
            const collaborator = await this.findCollaboratorUseCase.execute(uuid, tenantId);
            if(!collaborator) 
                return res.status(404).send({message: 'collaborator not founded.'});
            return res.status(200).send(collaborator);
        } catch (error) {this.logger.error(error)};
    }
}