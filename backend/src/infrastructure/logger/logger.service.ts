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
        this.logger.info(`${LogLevel.INFO}INFO: ${LogLevel.RESET}${message}`)
    }

    error(message: any, ...optionalParams: any[]) {
        signale.error(`${new Date()} - ${message}`)
        this.logger.error(`${LogLevel.ERROR}ERROR: ${LogLevel.RESET}${message}`)

    }
    warn(message: any, ...optionalParams: any[]) {
        signale.warn(`${new Date()} - ${message}`)
        this.logger.warn(`${LogLevel.WARNING}WARN: ${LogLevel.RESET}${message}`)
    }
    debug?(message: any, ...optionalParams: any[]) {
        signale.debug(`${new Date()} - ${message}`)
        this.logger.debug(`${LogLevel.DEBUG}DEBUG: ${LogLevel.RESET}${message}`)
    }
    verbose?(message: any, ...optionalParams: any[]) {
        signale.info(`${new Date()} - ${message}`)
        this.logger.info(`${LogLevel.RESET}${message}`)
    }
    fatal?(message: any, ...optionalParams: any[]) {
        signale.fatal(`${new Date()} - ${message}`)
        this.logger.error(`${LogLevel.RESET}${message}`)
    }

}