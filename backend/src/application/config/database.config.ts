import { Person } from "src/adapters/framework/database/entities/Person.entity"
import { User } from "src/adapters/framework/database/entities/User.entity"

export class DatabaseConfigurations { 
    public static host = process.env.HOST
    public static username = process.env.USER_DB
    public static port = process.env.PORT
    public static pwd = process.env.PWD_DB
    public static db_name = process.env.DB_NAME
}

export class DatabaseOptionsConfiguration { 
    type = 'mysql';
    host = process.env.HOST;
    port = process.env.PORT;
    username = process.env.USER_DB
    password = process.env.PWD_DB;
    database = process.env.DB_NAME
    entities: [Person, User];
    synchronize: true;
}