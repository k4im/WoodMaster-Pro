import * as dotenv from 'dotenv';
import { Address } from 'src/infrastructure/database/models/Addresses.entity';
import { Permissions } from 'src/infrastructure/database/models/Permissions.entity';
import { Person } from 'src/infrastructure/database/models/Person.entity';
import { Phone } from 'src/infrastructure/database/models/Phone.entty';
import { Product } from 'src/infrastructure/database/models/Products.entity,';
import { Role } from 'src/infrastructure/database/models/Role.entity';
import { Stock } from 'src/infrastructure/database/models/Stock.entity';
import { Tenant } from 'src/infrastructure/database/models/Tenant.entity';
import { User } from 'src/infrastructure/database/models/User.entity';
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