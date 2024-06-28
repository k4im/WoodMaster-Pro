import { ISingleCommandInterface } from "../../../Abstrations/ICoomands.interface";
import { Inject } from "@nestjs/common";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";


export default class findCollaboratorUseCase implements ISingleCommandInterface<IPersonDto> {
    constructor(
        @Inject("IPersonRepository") private readonly personRepository: IPersonRepository) { }

    async execute(uuid: string, tenantId?: string): Promise<IPersonDto> {
        const collaborator = await this.personRepository.findPersonByUuid(uuid, tenantId);
        return collaborator;
    }
}