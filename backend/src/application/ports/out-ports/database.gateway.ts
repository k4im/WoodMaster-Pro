import { DataSource } from "typeorm";

export interface DatabaseGateway {
    getDataSource(): Promise<DataSource>;
}