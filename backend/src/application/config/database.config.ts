import { Person } from "src/adapters/framework/database/entities/Person.entity"
import { User } from "src/adapters/framework/database/entities/User.entity"
import { Product } from "src/adapters/framework/database/entities/Products.entity,";
import { Stock } from "src/adapters/framework/database/entities/Stock.entity";
import { Role } from "src/adapters/framework/database/entities/Role.entity";
import { Tenant } from "src/adapters/framework/database/entities/Tenant.entity";
import { Permissions } from "src/adapters/framework/database/entities/Permissions.entity";


import * as dotenv from 'dotenv';
import { Address } from "src/adapters/framework/database/entities/Addresses.entity";
import { Phone } from "src/adapters/framework/database/entities/Phone.entty";
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