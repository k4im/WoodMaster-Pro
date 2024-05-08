import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { DatabaseConfigurations } from "src/application/config/database.config";

@Injectable()
export class DatabaseMysqlAdapter implements DatabaseGateway {
    async closeConnection(db: DataSource): Promise<void> {
        await db.destroy();
    } 
    
    async getDataSource(): Promise<DataSource> {   
        return new DataSource({
            type: 'mysql',
            host: DatabaseConfigurations.host,
            database: DatabaseConfigurations.db_name,
            port: parseInt(DatabaseConfigurations.port),
            username: DatabaseConfigurations.username,
            password: DatabaseConfigurations.pwd,
            entities: DatabaseConfigurations.entities,
            synchronize: false, 
        })
    }
}
