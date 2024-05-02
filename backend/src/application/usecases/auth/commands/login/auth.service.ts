import { Inject, Injectable } from '@nestjs/common';
import { AuthRepositoryService } from 'src/adapters/persistence/repository/auth-repository/auth-repository.service';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';

@Injectable()
export class LoginUserUseCase {

    constructor(
        private readonly auth: AuthRepositoryService,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}

    /**
     * Realiza a chamada do repositorio para efetuar a execução do caso de uso.
     * @param loginDto Recebe o loginDto para efetuar o processo de login.
     * @returns 
     */    
    async execute(loginDto: any) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [Auth] - [Execute]`);
            let result = await this.auth.login(loginDto.email, loginDto.senha);
            return result
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case de login [Use Case] - [Auth] - [Execute]: ${error}`);
        }
    }
}
