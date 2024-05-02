import { Inject, Injectable } from '@nestjs/common';
import { loginUseCase } from 'src/ports/in-ports/loginUseCase.gateway';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';

@Injectable()
export class LoginUserUseCase implements loginUseCase {

    constructor(
        @Inject("LoginUseCase")
        private readonly auth: loginUseCase,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}

    /**
     * Realiza a chamada do repositorio para efetuar a execução do caso de uso.
     * @returns string
     */    
    async execute(email: string, senha: string): Promise<string> {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [Auth] - [Execute]`);
            let result = await this.auth.execute(email, senha);
            return result
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case de login [Use Case] - [Auth] - [Execute]: ${error}`);
        }
    }
}
