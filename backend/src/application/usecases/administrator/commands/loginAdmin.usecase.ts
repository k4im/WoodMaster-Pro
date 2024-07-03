import { HttpStatus, Inject } from "@nestjs/common";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import ExpectedHttpError from "src/domain/exceptions/expectedhttp.error";
import AuthAbstraction from "src/infrastructure/services/auth/abstrations/AuthAbstrancion";
import { ILoginCommand } from "../../Abstrations/ICoomands.interface";
import { LoginDTO } from "src/application/dto/interfaces/login.dto";

export default class LoginAdministratorUseCase implements ILoginCommand {

    constructor(
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway,
        @Inject("AuthAdmin")
        private readonly authAdmService: AuthAbstraction
    ) { }

    async execute({ email, password }: LoginDTO, userAgent: string) {
        const loginResult = await this.authAdmService
            .login(email, password, userAgent);
        if (!loginResult)
            throw new ExpectedHttpError('An internal Error has ocurred.',
                HttpStatus.INTERNAL_SERVER_ERROR);
        return loginResult;
    }
}