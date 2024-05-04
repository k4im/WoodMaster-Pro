import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Person } from "./entities/Person.entity";
import { Permissions } from "./entities/Permissions.entity";
import { DatabaseGateway } from "src/application/ports/out-ports/database.gateway";
import { DatabaseConfigurations } from "src/application/config/database.config";

@Injectable()
export class DatabaseMysqlAdapter implements DatabaseGateway { 
    
    connect(): DataSource {
   
        const connection = new DataSource({
            type: 'mysql',
            host: DatabaseConfigurations.host,
            database: DatabaseConfigurations.db_name,
            port: parseInt(DatabaseConfigurations.port),
            username: DatabaseConfigurations.username,
            password: DatabaseConfigurations.pwd,
            entities: DatabaseConfigurations.entities
        })
        return connection;
    }
}
