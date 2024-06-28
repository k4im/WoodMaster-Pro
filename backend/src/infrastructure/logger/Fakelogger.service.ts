import {Injectable, LoggerService } from '@nestjs/common';
import { LoggerGateway } from 'src/application/ports/out-ports/logger.gateway';
import * as signale from 'signale';

@Injectable()
export class FakeLogger implements LoggerService, LoggerGateway {

    log(message: any, ...optionalParams: any[]) {
        // console.log(`${LogLevel.INFO}INFO: ${LogLevel.RESET}${message}`)
    }

    error(message: any, ...optionalParams: any[]) {
        signale.error(message)
    }
    warn(message: any, ...optionalParams: any[]) {
        signale.warn(message)
    }
    debug?(message: any, ...optionalParams: any[]) {
        signale.debug(message)
    }
    verbose?(message: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }
    fatal?(message: any, ...optionalParams: any[]) {
        throw new Error('Method not implemented.');
    }

}
