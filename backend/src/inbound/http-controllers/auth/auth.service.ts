import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { AuthRepositoryService } from 'src/outbound/repository/auth-repository/auth-repository.service';
import { log } from 'console';


@Injectable()
export class AuthService {
  constructor(
    private readonly auth: AuthRepositoryService, 
    private readonly logger:  CustomLogger) {}
  
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
