import * as dotenv from 'dotenv';
import { Address } from 'src/infrastructure/database/model/Addresses.entity';
import { Permissions } from 'src/infrastructure/database/model/Permissions.entity';
import { Person } from 'src/infrastructure/database/model/Person.entity';
import { Phone } from 'src/infrastructure/database/model/Phone.entty';
import { Product } from 'src/infrastructure/database/model/Products.entity,';
import { Role } from 'src/infrastructure/database/model/Role.entity';
import { Stock } from 'src/infrastructure/database/model/Stock.entity';
import { Tenant } from 'src/infrastructure/database/model/Tenant.entity';
import { User } from 'src/infrastructure/database/model/User.entity';
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