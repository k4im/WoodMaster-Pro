import CollaboratorDto from "src/application/dto/collaborator.dto";
import { ICommandInterface, ICommandInterfaceUpdate } from "../../../Abstrations/ICoomands.interface";
import { Inject } from "@nestjs/common";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import PersonDomainEntity from "src/domain/entities/person.domain";
import { Name } from "src/domain/valueObjects/nameVo/name.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Cpf } from "src/domain/valueObjects/cpfVo/cpf.value.object";
import { RgDocument } from "src/domain/valueObjects/rgVo/rg.value.object";

export default class updateCollaboratorUseCase implements ICommandInterfaceUpdate<CollaboratorDto> {
    constructor(
        @Inject("IPersonRepository")
        private readonly repo: IPersonRepository,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) { }

    async execute(data: CollaboratorDto, uuid: string): Promise<boolean> {
        const collaborator = new PersonDomainEntity(
            new Name(data.Name.FirsName, data.Name.LastName),
            new Email(data.Email.email),
            data.Addresses, data.Phones,
            new Name(data.FathersName.FirsName, data.FathersName.LastName),
            new Name(data.MothersName.FirsName, data.MothersName.LastName),
            new Cpf(data.Cpf.value),
            new RgDocument(data.Rg.value),
            false, false, false,
            data.IsCollaborator);
        return await this.repo.updatePerson(collaborator, uuid);
    }

}