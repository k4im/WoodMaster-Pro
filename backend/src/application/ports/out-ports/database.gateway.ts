import { DataSource } from "typeorm";

export interface DatabaseGateway {
    connect(): DataSource;
}