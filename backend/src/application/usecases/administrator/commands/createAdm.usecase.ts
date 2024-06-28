import { Inject, Injectable } from "@nestjs/common";
import { ICommandInterface } from "../../Abstrations/ICoomands.interface";
import AdminDto from "src/application/dto/adm.dto";
import { IAdministratorRepository } from "src/infrastructure/repository/abstraction/IAdministratorRepository.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import Administrator from "src/domain/entities/admin.domain.entity";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import Password from "src/domain/valueObjects/PasswordVo/password.value.object";

@Injectable()
export default class CreateAdministratorUseCase implements ICommandInterface<AdminDto> {
    constructor(
        @Inject("IAdminRepository")
        private readonly repo: IAdministratorRepository,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) { }

    /**
     * Efetua a criação de um novo administrador no sistema.
     * @param data dados do administrator
     * @returns boolean
     */
    async execute(data: AdminDto): Promise<boolean> {
        const administrator = new Administrator(
            new Email(data.Email),
            new Password(data.Password)
        );
        return await this.repo.createAdministrator(administrator);
    }

}