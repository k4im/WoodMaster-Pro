/**
 * Env Logger
 * 
 * Classe utilizada para imprimir as 
 * variaveis de ambientes que estão sendo utilizadas
 * atualmente
 * 
 * @author João Victor.
 */

const signale = require('signale');
export default class EnvLogger {
    constructor() {}

    Log() {
        signale.star("MY ENV VARS: ")
        console.log();
        signale.info('DB HOST: ' + process.env.HOST);
        signale.info('DB PORT: ' + process.env.PORT_DB);
        signale.info('DB USER: ' + process.env.USER_DB);
        signale.info('DB NAME: ' + process.env.DB_NAME);
        signale.info('PORT_APP: ' + process.env.PORT_APP);
        console.log();
 
    }
}
