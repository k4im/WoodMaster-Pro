import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { DatabaseConfigurations } from "src/infrastructure/config/database.config";

@Injectable()
export class DatabaseInMemory implements DatabaseGateway { 
    async closeConnection(db: DataSource): Promise<void> {
        await db.destroy();
    } 
    
    async getDataSource(): Promise<DataSource> {   
        return new DataSource({
            type: 'better-sqlite3',
            database: ':memory',
            dropSchema: false,
            timeout: 9000,
            readonly: false,
            entities: DatabaseConfigurations.entities,
            synchronize: true, 
        }).initialize()
    }
}
