import { Body, Controller, HttpStatus, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/application/decorators/role.decorator";
import AuthMiddleware from "src/application/http/middlewares/auth.guard";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import ExpectedHttpError from "src/application/types/expectedhttp.error";
import { IAuthCommand } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";

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
    async handle(@Req() {headers}: Request, @Body() {email, password}: any) {
        try {
            const userAgent = headers['user-agent'];
            const authAdmTokenResult = await this.authAdmService
            .execute(email, password, userAgent);
            if(!authAdmTokenResult) 
                throw new ExpectedHttpError('token not created.', 
                HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (error) {
            if(error instanceof ExpectedHttpError) 
                this.logger.error(`Expected controller adm login error: ${error}`);
            this.logger.error(`Houve um erro no controlador de login ADM: ${error}`)
        }
    }
}