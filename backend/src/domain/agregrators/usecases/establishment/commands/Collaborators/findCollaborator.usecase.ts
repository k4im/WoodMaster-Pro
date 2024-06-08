import { ISingleCommandInterface } from "../../../Abstrations/ICoomands.interface";
import { Inject } from "@nestjs/common";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import { IPersonDto } from "src/application/dto/Person.dto";

export default class findCollaboratorUseCase implements ISingleCommandInterface<IPersonDto> {
    constructor(
        @Inject("IPersonRepository") private readonly personRepository: IPersonRepository) { }

    async execute(uuid: string, tenantId?: string): Promise<IPersonDto> {
        try {
            const collaborator = await this.personRepository.findPersonByUuid(uuid, tenantId);
            return collaborator;
        } catch (error) {
            console.log(`Houve um erro: ${error}`); 

        }
    }
}