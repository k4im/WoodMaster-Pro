import { DataSource } from "typeorm";

export interface DatabaseGateway {
    getDataSource(): Promise<DataSource>;
    closeConnection(db: DataSource): Promise<void>;
}