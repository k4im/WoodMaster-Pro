import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { LogLevel } from 'src/application/enum/logger.enum';
import { LoggerGateway } from 'src/application/ports/out-ports/logger.gateway';
const signale = require('signale');

@Injectable()
export class CustomLogger implements LoggerService, LoggerGateway {

    private logger = createLogger({
        transports: [
            // new transports.Console(),
            new transports.File({ filename: 'WoodMaster.log' }),
        ],
        format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
        ),
    });

    log(message: any, ...optionalParams: any[]) {
        signale.info(`${new Date()} - ${message}`)
        this.logger.info(`${message}`)
    }

    error(message: any, ...optionalParams: any[]) {
        signale.error(`${new Date()} - ${message}`)
        this.logger.error(`${message}`)

    }
    warn(message: any, ...optionalParams: any[]) {
        signale.warn(`${new Date()} - ${message}`)
        this.logger.warn(`{message}`)
    }
    debug?(message: any, ...optionalParams: any[]) {
        signale.debug(`${new Date()} - ${message}`)
        this.logger.debug(`${message}`)
    }
    verbose?(message: any, ...optionalParams: any[]) {
        signale.info(`${new Date()} - ${message}`)
        this.logger.info(`${message}`)
    }
    fatal?(message: any, ...optionalParams: any[]) {
        signale.fatal(`${new Date()} - ${message}`)
        this.logger.error(`${message}`)
    }

}
