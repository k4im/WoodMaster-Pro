import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
import { LogLevel } from 'src/domain/enum/logger.enum';
import { LoggerGateway } from 'src/application/ports/out-ports/logger.gateway';

@Injectable()
export class FakeLogger  implements LoggerService, LoggerGateway{
    
      log(message: any, ...optionalParams: any[]) {
        console.log(`${LogLevel.INFO}INFO: ${LogLevel.RESET}${message}`)
    }

    error(message: any, ...optionalParams: any[]) {
        console.log(`${LogLevel.ERROR}ERROR: ${LogLevel.RESET}${message}`)

    }
    warn(message: any, ...optionalParams: any[]) {
        console.log(`${LogLevel.WARNING}WARN: ${LogLevel.RESET}${message}`)
    }
    debug?(message: any, ...optionalParams: any[]) {
        console.log(`${LogLevel.DEBUG}DEBUG: ${LogLevel.RESET}${message}`)
    }
    verbose?(message: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    fatal?(message: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }

}
