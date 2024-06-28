import { HttpStatus, Inject } from "@nestjs/common";
import { IAuthCommand } from "../../Abstrations/ICoomands.interface";
import AuthAbstraction from "src/infrastructure/services/auth/abstrations/AuthAbstrancion";
import ExpectedHttpError from "src/domain/types/expectedhttp.error";

export default class AuthAdministratorUseCase implements IAuthCommand {
    constructor(
        @Inject("AuthAbstraction")
        private readonly authService: AuthAbstraction,
    ) { }
    async execute(email: string, senha: string, userAgent: string): Promise<string> {
        const authResult = await this.authService.login(email, senha, userAgent);
        if (authResult)
            return authResult;

        throw new ExpectedHttpError('Token not created.',
            HttpStatus.NOT_FOUND);
    }

}