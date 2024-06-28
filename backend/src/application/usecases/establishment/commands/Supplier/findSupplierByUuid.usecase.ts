import { Inject, Injectable } from "@nestjs/common";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import { ISingleCommandInterface } from "../../../Abstrations/ICoomands.interface";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";

@Injectable()
export default class FindSupplierByUuidUseCase implements ISingleCommandInterface<IPersonDto> {

    constructor(
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway,
        @Inject("IPersonRepository")
        private readonly repo: IPersonRepository
    ) { }
    async execute(uuid: string, tenantId?: string): Promise<IPersonDto> {
        return await this.repo.findPersonByUuid(uuid, tenantId);
    }

}