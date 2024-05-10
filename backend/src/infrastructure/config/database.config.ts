import * as dotenv from 'dotenv';
import { Address } from 'src/domain/databaseEntities/Addresses.entity';
import { Permissions } from 'src/domain/databaseEntities/Permissions.entity';
import { Person } from 'src/domain/databaseEntities/Person.entity';
import { Phone } from 'src/domain/databaseEntities/Phone.entty';
import { Product } from 'src/domain/databaseEntities/Products.entity,';
import { Role } from 'src/domain/databaseEntities/Role.entity';
import { Stock } from 'src/domain/databaseEntities/Stock.entity';
import { Tenant } from 'src/domain/databaseEntities/Tenant.entity';
import { User } from 'src/domain/databaseEntities/User.entity';
dotenv.config();

export class DatabaseConfigurations { 
    public static host = `${process.env.HOST}`
    public static username = process.env.USER_DB
    public static port = process.env.PORT_DB
    public static pwd = process.env.PWD_DB
    public static db_name = process.env.DB_NAME
    public static entities = [
        Person, User, Permissions, 
        Tenant, Role, Stock, 
        Product, Address, Phone]
}