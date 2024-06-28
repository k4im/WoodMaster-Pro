import { HttpStatus, Inject } from "@nestjs/common";
import { IAuthCommand } from "../../Abstrations/ICoomands.interface";
import AuthAbstraction from "src/infrastructure/services/auth/abstrations/AuthAbstrancion";
import ExpectedHttpError from "src/domain/types/expectedhttp.error";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";

export default class AuthAdministratorUseCase implements IAuthCommand {
    constructor(
        @Inject("AuthAbstraction")
        private readonly authService : AuthAbstraction,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ){}
    async execute(email: string, senha: string, userAgent: string): Promise<string> {
        try {
            const authResult = await this.authService.login(email, senha, userAgent);
            if(authResult) 
                return authResult;
            
            throw new ExpectedHttpError('Token not created.',
                HttpStatus.NOT_FOUND);
        } catch (error) {
            this.logger.error(error);    
        }
    } 
    
}