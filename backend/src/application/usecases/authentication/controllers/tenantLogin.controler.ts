import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { IAuthCommand } from "../../Abstrations/ICoomands.interface";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";

@Controller('tenant')
@ApiTags('tenant')
export default class TenantLoginController { 

    constructor(
        @Inject("IAuthCommand")
        private readonly authUseCase: IAuthCommand,
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway
    ) {}

    @Post('login')
    @ApiOperation({summary: 'ROTA EM DESENVOLVIMENTO'})
    async handle(@Body() {email, password}: any) { 

    }
}