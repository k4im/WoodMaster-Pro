import { Inject, Injectable } from "@nestjs/common";
import { ICommandCreatePerson, ICommandInterface } from "../../../Abstrations/ICoomands.interface";
import SupllierDto from "src/application/dto/supplier.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import PersonDomainEntity from "src/domain/entities/person.domain";
import { Name } from "src/domain/valueObjects/nameVo/name.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Cpf } from "src/domain/valueObjects/cpfVo/cpf.value.object";
import { RgDocument } from "src/domain/valueObjects/rgVo/rg.value.object";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";

@Injectable()
export default class CreateSupplierUseCase implements ICommandCreatePerson<SupllierDto, Tenant> {
    constructor(
        @Inject("LoggerGateway")
        private readonly Logger: LoggerGateway,
        @Inject("IPersonRepository")
        private readonly repo: IPersonRepository
    ) { }

    async execute(data: SupllierDto, other: Tenant): Promise<boolean> {
        const supplier = new PersonDomainEntity(
            new Name(data.Name.FirsName, data.Name.LastName),
            new Email(data.Email.email),
            data.Addresses, data.Phones,
            new Name(data.FathersName.FirsName, data.FathersName.LastName),
            new Name(data.MothersName.FirsName, data.MothersName.LastName),
            new Cpf(data.Cpf.value),
            new RgDocument(data.Rg.value),
            false, data.IsSupplier, false, false
        );
        supplier.setTenant(other);
        return await this.repo.createPerson(supplier);
    }

}