import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

class tokenResponse { 
  @ApiProperty()
  token: string 
}
@ApiTags("Autenticação")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: "A rota será utilizada para efetuar login no sistema."})
  @ApiResponse({status: 200, description: "Caso a operação ocorra corretamente estara sendo retornado status 200", type: tokenResponse})
  @Post("login")
  login(@Body() login: LoginDto, @Res() res: Response) {
    try {
        let result = this.authService.login(login);
        (result) ? res.status(200).send({token: result}): res.status(500).send({message: "Não foi possivel efetuar o login."});
    } catch (error) {
      res.status(500).send({message: "Houve um erro eu tentar realizar a operação de login."})
    }
  }
}
