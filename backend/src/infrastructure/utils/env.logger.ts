/**
 * Env Logger
 * 
 * Classe utilizada para imprimir as 
 * variaveis de ambientes que estão sendo utilizadas
 * atualmente
 * 
 * @author João Victor.
 */

import { Inject } from "@nestjs/common";
import { LoggerGateway } from "src/application/ports/out-ports/logger.gateway";

export default class EnvLogger {
    constructor(
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway
    ) { }

    Log() {
        this.logger.log("MY ENV VARS: ")
        this.logger.log("==================================")
        this.logger.log('DB HOST: ' + process.env.HOST);
        this.logger.log('DB PORT: ' + process.env.PORT_DB);
        this.logger.log('DB USER: ' + process.env.USER_DB);
        this.logger.log('DB NAME: ' + process.env.DB_NAME);
        this.logger.log('PORT_APP: ' + process.env.PORT_APP);
        this.logger.log("==================================")
    
    }
}
