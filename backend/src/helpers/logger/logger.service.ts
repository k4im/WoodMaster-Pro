import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { LogLevel } from './logger.enum';

@Injectable()
export class CustomLogger  implements LoggerService{
    
    log(message: any, ...optionalParams: any[]) {
        console.log(`${LogLevel.LIGHT_GRAY}${new Date()} ${LogLevel.INFO}INFO: ${LogLevel.RESET}${message}`)
    }

    error(message: any, ...optionalParams: any[]) {
        console.log(`${LogLevel.RESET}${new Date()} ${LogLevel.ERROR}ERROR: ${LogLevel.RESET}${message}`)

    }
    warn(message: any, ...optionalParams: any[]) {
        console.log(`${LogLevel.LIGHT_GRAY}${new Date()} ${LogLevel.WARNING}WARN: ${LogLevel.RESET}${message}`)
    }
    debug?(message: any, ...optionalParams: any[]) {
        console.log(`${LogLevel.LIGHT_GRAY}${new Date()} ${LogLevel.DEBUG}DEBUG: ${LogLevel.RESET}${message}`)
    }
    verbose?(message: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    fatal?(message: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }

}
