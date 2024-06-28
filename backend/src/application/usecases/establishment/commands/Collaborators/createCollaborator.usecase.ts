import CollaboratorDto from "src/application/dto/collaborator.dto";
import { ICommandCreatePerson, ICommandInterface } from "../../../Abstrations/ICoomands.interface";
import { Inject } from "@nestjs/common";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import PersonDomainEntity from "src/domain/entities/person.domain";
import { Name } from "src/domain/valueObjects/nameVo/name.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Cpf } from "src/domain/valueObjects/cpfVo/cpf.value.object";
import { RgDocument } from "src/domain/valueObjects/rgVo/rg.value.object";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";
import { decode } from 'jsonwebtoken';

export default class createCollaboratorUseCase implements ICommandCreatePerson<CollaboratorDto, Tenant> {
    constructor(
        @Inject("IPersonRepository") private readonly personRepository: IPersonRepository) { }

    async execute(data: CollaboratorDto, other: Tenant): Promise<boolean> {
        const isCollaborator = true;
        const collaborator = new PersonDomainEntity(
            new Name(data.Name.FirsName, data.Name.LastName),
            new Email(data.Email.email),
            data.Addresses, data.Phones,
            new Name(data.FathersName.FirsName, data.FathersName.LastName),
            new Name(data.MothersName.FirsName, data.MothersName.LastName),
            new Cpf(data.Cpf.value),
            new RgDocument(data.Rg.value),
            false, false, false,
            isCollaborator);
        collaborator.setTenant(other)
        const result = await this.personRepository.createPerson(collaborator);
        return result;
    }

}