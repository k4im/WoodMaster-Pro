import { Inject, Injectable } from "@nestjs/common";
import { ICommandInterface } from "../../../Abstrations/ICoomands.interface";
import { IUserDto } from "src/application/dto/interfaces/IUser.dto";
import UserDomanEntity from "src/domain/entities/user.domain";
import UserDto from "src/application/dto/user.dto";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import Password from "src/domain/valueObjects/PasswordVo/password.value.object";
import IUserRespository from "src/infrastructure/repository/abstraction/IUserRepository.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";

@Injectable()
export default class CreateUserForCollaborator implements ICommandInterface<UserDto> {
    constructor(
        @Inject("IUserRepository")
        private readonly repo: IUserRespository,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) { }

    execute(data: UserDto): Promise<boolean> {
        const collaboratorUser = new UserDomanEntity(
            new Email(data.EmailAddr.email),
            data.Password.value,
            data.Role, data.PersonId
        );
        return this.repo.createNewUser(collaboratorUser);
    }

}