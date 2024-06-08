import { HttpStatus, Inject } from "@nestjs/common";
import { LoginDTO } from "src/application/dto/login.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import ExpectedHttpError from "src/application/types/expectedhttp.error";
import AuthAbstraction from "src/infrastructure/services/auth/abstrations/AuthAbstrancion";
import { ILoginCommand } from "../../Abstrations/ICoomands.interface";

export default class LoginAdministratorUseCase implements ILoginCommand{ 
    
    constructor(
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway,
        @Inject("AuthAdmin")
        private readonly authAdmService: AuthAbstraction
    ) {}
    
    async execute({email, password}: LoginDTO, userAgent: string) { 
        try {
            const loginResult = await this.authAdmService
            .login(email, password, userAgent);
            if(!loginResult) 
                throw new ExpectedHttpError('An internal Error has ocurred.',
                HttpStatus.INTERNAL_SERVER_ERROR);
            return loginResult; 
        } catch (error) {
            if(error instanceof ExpectedHttpError) 
                this.logger.error(`Token vazio: ${error}`);
            this.logger.error(`Houve um erro interno ao tentar logar: ${error}`)
        }
    }
}