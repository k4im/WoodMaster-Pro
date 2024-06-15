import { Body, Controller, Get, Inject, Post, Req, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import AdminDto from "src/application/dto/adm.dto";
import { IAdmin } from "src/application/dto/interfaces/IAdm.dto";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";
import { ICommandInterface } from "src/domain/agregrators/usecases/Abstrations/ICoomands.interface";

@Controller('admin')
@ApiTags('admin')
export default class CreateAdministratorController { 
    constructor(
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway,
        @Inject('ICreateAdmUseCase')
        private readonly createAdmUseCase: ICommandInterface<AdminDto> 
    ) {}
    @Post('administrator')
    @ApiOperation({
        summary: 'Rota utilizada para efetuar a criação de um novo administrador.',
        description: `A rota poderá ser utilizada para realizar a criação de um administrador.
        para isto será necessário informar o endereço de email do administrador assim como a senha para acesso.
        Após realizada a criação do administrador será possivel efetuar o login na rota de auth do controlador de adm.`
    })
    @ApiResponse({status: 200, description: 'Resposta de sucesso.'})
    @ApiResponse({status: 500, description: 'Resposta de erro interno.'})
    async handle(@Body() data: AdminDto, @Res() res: Response) {
        try {
            const result = await this.createAdmUseCase.execute(data);
            result ? 
            res.status(200).send({message: 'Administrator added.'}) : 
            res.status(500).send({message: 'An internal error has ocurred.'})
        } catch (error) {
            this.logger.error(`Houve um error no controller [create admin]: ${error}`)
        }

    }
}