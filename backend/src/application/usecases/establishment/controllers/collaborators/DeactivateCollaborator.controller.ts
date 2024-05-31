import { Controller, Inject } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ISingleCommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";

@Controller('establishment')
@ApiTags('establishment')
export default class deactiveCollaboratorController { 
    constructor(
        @Inject('deactivateCollab')
        private readonly deactivateCollabUseCase: ISingleCommandInterface<boolean>,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) {}

    async handle() {
        
    }
}