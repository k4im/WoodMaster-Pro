import { Inject, Injectable } from "@nestjs/common";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import IPersonRepository from "src/infrastructure/repository/abstraction/IPersonRepository.interface";
import { ICommandInterfaceUpdate } from "../../../Abstrations/ICoomands.interface";
import SupplierDto from "src/application/dto/supplier.dto";
import { Name } from "src/domain/valueObjects/nameVo/name.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Cpf } from "src/domain/valueObjects/cpfVo/cpf.value.object";
import { RgDocument } from "src/domain/valueObjects/rgVo/rg.value.object";
import PersonDomainEntity from "src/domain/entities/person.domain";

@Injectable()
export default class UpdateSupplierUseCase implements ICommandInterfaceUpdate<SupplierDto> {
    constructor(
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway,
        @Inject("IPersonRepository")
        private readonly repo: IPersonRepository
    ) { }

    async execute(data: SupplierDto, uuid: string): Promise<boolean> {
        const isSupplier = true;
        const supplier = new PersonDomainEntity(
            new Name(data.Name.FirsName, data.Name.LastName),
            new Email(data.Email.email),
            data.Addresses, data.Phones,
            new Name(data.FathersName.FirsName, data.FathersName.LastName),
            new Name(data.MothersName.FirsName, data.MothersName.LastName),
            new Cpf(data.Cpf.value),
            new RgDocument(data.Rg.value),
            false, isSupplier, false, false
        );
        return await this.repo.updatePerson(supplier, uuid);
    }

}