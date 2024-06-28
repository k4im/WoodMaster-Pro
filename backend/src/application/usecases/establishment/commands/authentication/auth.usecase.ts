import { Inject } from "@nestjs/common";
import AuthAbstraction from "src/infrastructure/services/auth/abstrations/AuthAbstrancion";
import { IAuthCommand } from "../../../Abstrations/ICoomands.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";

export default class AuthUseCase implements IAuthCommand {

    constructor(
        @Inject("AuthAbstraction")
        private readonly authService: AuthAbstraction,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) { }

    async execute(email: string, senha: string, userAgent: string): Promise<string> {
        return await this.authService.login(email, senha, userAgent);
    }
}