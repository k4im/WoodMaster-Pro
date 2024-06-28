import { Body, Controller, HttpStatus, Inject, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { LoginDTO } from "src/application/dto/interfaces/login.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import ExpectedHttpError from "src/domain/types/expectedhttp.error";
import { IAuthCommand } from "src/application/usecases/Abstrations/ICoomands.interface";

@Controller('admin')
@ApiTags('admin')
export default class AuthAdminController {

    /** TODO */
    constructor(
        @Inject("AuthUseCase")
        private readonly authAdmService: IAuthCommand,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) { }

    @Post('auth')
    @ApiOperation({
        summary: 'Rota utilizada para efetuar login de um ADM.',
        description: `Poderá estar sendo utilizada esta rota para realizar
        a operação de login de um administrador.
        
        token: string`
    })
    @ApiResponse({ status: 500, description: 'Erro interno.' })
    @ApiResponse({ status: 200, description: 'Resposta de sucesso.' })
    async handle(@Req() { headers }: Request, @Body() payload: LoginDTO, @Res() res: Response) {
        const userAgent = headers['user-agent'];
        console.log(payload)
        const authAdmTokenResult = await this.authAdmService
            .execute(payload.email, payload.password, userAgent);
        if (!authAdmTokenResult)
            throw new ExpectedHttpError('token not created.',
                HttpStatus.INTERNAL_SERVER_ERROR);
        return res.status(200).send({ token: authAdmTokenResult })
    }
}