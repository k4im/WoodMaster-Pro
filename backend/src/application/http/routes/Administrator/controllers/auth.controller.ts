import { Body, Controller, HttpStatus, Inject, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { LoginDTO } from "src/application/dto/interfaces/login.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import ExpectedHttpError from "src/application/types/expectedhttp.error";
import { IAuthCommand } from "src/application/usecases/Abstrations/ICoomands.interface";

@Controller('admin')
@ApiTags('admin')
export default class AuthAdminController  {
    
    /** TODO */
    constructor(
        @Inject("AuthUseCase")
        private readonly authAdmService: IAuthCommand,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) {}

    @Post('auth')
    @ApiOperation({
        summary: 'Rota utilizada para efetuar login de um ADM.',
        description: `Poderá estar sendo utilizada esta rota para realizar
        a operação de login de um administrador.
        
        token: string`
    })
    @ApiResponse({status: 500, description: 'Erro interno.'})
    @ApiResponse({status: 200, description: 'Resposta de sucesso.'})
    async handle(@Req() {headers}: Request, @Body() {email, password}: LoginDTO, @Res() res: Response) {
        try {
            const userAgent = headers['user-agent'];
            const authAdmTokenResult = await this.authAdmService
            .execute(email, password, userAgent);
            if(!authAdmTokenResult) 
                throw new ExpectedHttpError('token not created.', 
                HttpStatus.INTERNAL_SERVER_ERROR);
            return res.status(200).send({token: authAdmTokenResult})
        } catch (error) {
            if(error instanceof ExpectedHttpError) 
                this.logger.error(`Expected controller adm login error: ${error}`);
            this.logger.error(`Houve um erro no controlador de login ADM: ${error}`)
            return res.status(error.getStatus()).send({message: error.message})
        }
    }
}