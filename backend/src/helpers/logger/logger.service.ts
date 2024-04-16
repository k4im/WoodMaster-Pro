import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { LogLevel } from './logger.enum';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class CustomLogger  implements LoggerService{
    private logger = createLogger({
        transports: [
          new transports.Console(),
          new transports.File({ filename: 'WoodMaster.log' }),
        ],
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
        ),
      });
    log(message: any, ...optionalParams: any[]) {
        this.logger.info(`${LogLevel.INFO}INFO: ${LogLevel.RESET}${message}`)
    }

    error(message: any, ...optionalParams: any[]) {
        this.logger.error(`${LogLevel.ERROR}ERROR: ${LogLevel.RESET}${message}`)

    }
    warn(message: any, ...optionalParams: any[]) {
        this.logger.warn(`${LogLevel.WARNING}WARN: ${LogLevel.RESET}${message}`)
    }
    debug?(message: any, ...optionalParams: any[]) {
        this.logger.debug(`${LogLevel.DEBUG}DEBUG: ${LogLevel.RESET}${message}`)
    }
    verbose?(message: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    fatal?(message: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }

}
