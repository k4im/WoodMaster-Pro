import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IAuthCommand } from "../../Abstrations/ICoomands.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { LoginDTO } from "src/application/dto/login.dto";
import { Response } from "express";

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
    async handle(@Body() {email, password}: LoginDTO, res: Response) { 
        try {
            const result = await this.authUseCase.execute(email, password);
            result ? 
            res.send(200).send({token: result}) :
            res.send(500).send({message: 'An internal error has ocurred.'});
        } catch (error) {this.logger.error(error)}
    }
}