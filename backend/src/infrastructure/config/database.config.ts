import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();
//#region Configuração de banco de dados para utilização do CLI
export const databaseOptions: DataSourceOptions = { 
    type: 'mysql',
    host: `${process.env.HOST}`,
    port: parseInt(process.env.PORT_DB),
    username: process.env.USER_DB,
    password: process.env.PWD_DB,
    database: process.env.DB_NAME,
    entities: ['dist/infrastructure/database/models/*{.ts,.js}'],
    synchronize: true,
    migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],

}
const dataSource = new DataSource(databaseOptions);
export default dataSource;
//#endregion

//#region configs para gerar novas conexões
export class DatabaseConfigurations { 
    public static host = `${process.env.HOST}`
    public static username = process.env.USER_DB
    public static port = process.env.PORT_DB
    public static pwd = process.env.PWD_DB
    public static db_name = process.env.DB_NAME
}
//#endregion