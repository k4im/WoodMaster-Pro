import { Body, Controller, Inject, Post, Req } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { Response } from "express";
import { IAuthCommand } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";
import { LoginDTO } from "src/application/dto/interfaces/login.dto";

@Controller('establishment')
@ApiTags('establishment')
export default class EstablishmentLoginController { 

    constructor(
        @Inject("IAuthCommand")
        private readonly authUseCase: IAuthCommand,
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway
    ) {}

    @Post('login')
    @ApiOperation({
        summary: 'Rota utilizada para um determinado tenant realizar login.',
        description: `Rota estará sendo utilizada para efetuar o login de um cliente,
        realizar o login corretamente estará retornando um token de acesso.
        
        token: string`
    })
    @ApiBody({
        type: LoginDTO,
        description: `deverá ser fornecido email e senha validas para
        que então seja realizado o login corretamente.`
    })
    @ApiResponse({status: 200, description: 'ao realizar o login corretamente.'})
    @ApiResponse({status: 500, description: 'erro interno ao realizar o login.'})
    async handle(@Req() {headers}: Request, @Body() {email, password}: LoginDTO, res: Response) { 
        try {
            const userAgent = headers['user-agent'];
            const result = await this.authUseCase.execute(email, password, userAgent);
            result ? 
            res.send(200).send({token: result}) :
            res.send(500).send({message: 'An internal error has ocurred.'});
        } catch (error) {this.logger.error(error)}
    }
}