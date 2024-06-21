import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Response } from "express";
import { TypeORMError } from "typeorm";
import { LoggerGateway } from "../ports/out-ports/logger.gateway";

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

        this.logger.error(`Exception not handled: [${exception.message}]`);
        
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({message: 'An internal error has ocurred.'})
    }
    
}