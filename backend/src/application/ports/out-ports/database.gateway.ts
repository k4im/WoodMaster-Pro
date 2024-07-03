/**
 * Portas de acesso ao banco de dados.
 * 
 * Onde poderá ser utilizado diversos bancos de dados
 * não se limitando apenas um, desde que seja integrado ao 
 * typeorm.
 * 
 * @author João Victor.
 */
import { DataSource } from "typeorm";

export interface DatabaseGateway {
    getDataSource(): Promise<DataSource>;
    closeConnection(db: DataSource): Promise<void>;
}