/**
 * Gateway de interação com o log
 * 
 * @author João Victor.
 */
export interface LoggerGateway {
    log(message: any, ...optionalParams: any[]);
    error(message: any, ...optionalParams: any[]);
    warn(message: any, ...optionalParams: any[]);
}
