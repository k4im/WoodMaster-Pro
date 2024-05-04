import { DataSource } from "typeorm";

export interface DatabaseGateway {
    connect(): Promise<DataSource>;
}