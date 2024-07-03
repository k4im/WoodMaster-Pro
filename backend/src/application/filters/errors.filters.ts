/**
 * Filtro geral de erros.
 * 
 * Este trata-se de um filtro 
 * geral para todos os erros dentro do sistema
 * que não estejam dentro do escopo try/catch.
 * 
 * portanto todos os erros que forem gerados dentro do sistema
 * serão convertidos em respostas http adequadas.
 * 
 * @author João Victor.
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Response } from "express";
import { TypeORMError } from "typeorm";
import { LoggerGateway } from "../ports/out-ports/logger.gateway";
import ExpectedError from "src/domain/exceptions/expected.error";

@Catch()
export default class GlobalFilter implements ExceptionFilter {
    constructor(
        @Inject('LoggerGateway')
        private readonly logger: LoggerGateway
    ){}

    catch(exception: any, host: ArgumentsHost) {
        const res = host.switchToHttp()
            .getResponse<Response>()
        
        if(exception instanceof TypeORMError){
            this.logger.error(exception.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send({message: 'An typeorm has ocurred.'})
        };
        if(exception instanceof HttpException)
            return res.status(exception.getStatus()).send({message: exception.message});

        if(exception instanceof ExpectedError && exception.message.includes('Duplicate entry'))
            return res.status(HttpStatus.CONFLICT)
            .send({message: 'Value already in use.'})
        
        if(exception instanceof ExpectedError)
            return res.status(HttpStatus.BAD_REQUEST)
            .send({message: exception.message});
        
        this.logger.error(`Exception not handled: [${exception.message}]`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({message: exception.message})
        
    }
    
}