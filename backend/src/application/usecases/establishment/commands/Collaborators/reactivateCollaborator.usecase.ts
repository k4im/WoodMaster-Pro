import { Inject } from "@nestjs/common";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import { ISingleCommandInterface } from "../../../Abstrations/ICoomands.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";

export default class reactivateCollaboratorUseCase implements ISingleCommandInterface<boolean> {
    constructor(
        @Inject("IPersonRepository")
        private readonly personRepository: IPersonRepository,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) { }

    async execute(uuid: string): Promise<boolean> {
        const result = await this.personRepository.reactivatePerson(uuid);
        return result;

    }

}