import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';
import { AuthGateway } from 'src/ports/in-ports/auth.gateawy';


@Injectable()
export class AuthServiceController {
  constructor(
    @Inject("AuthGateway")
    private readonly auth: AuthGateway,
    @Inject("LoggerGateway") 
    private readonly logger:  LoggerGateway) {}
  
  /**
   * O metodo sera utilizado para realizar o login de um usuario existente no sistema.
   *  
   * @param Login Recebe os dados para serem realizados a operação de login.
   */
  async login(login: LoginDto) {
    try {
      let result = await this.auth.login(login.email, login.senha);
      this.logger.log("Recebido jwt emitido. [Auth Service] - [Metodo] - [login]")
      return result;
    } catch (error) {
      this.logger.error(`Houve um erro ao tentar efetuar o login. [Auth Service] - [Metodo] - [login]`)
    }
  }
}
