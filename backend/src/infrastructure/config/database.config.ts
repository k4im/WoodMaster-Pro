import { Person } from "src/infrastructure/database/entities/Person.entity"
import { User } from "src/infrastructure/database/entities/User.entity"
import { Product } from "src/infrastructure/database/entities/Products.entity,";
import { Stock } from "src/infrastructure/database/entities/Stock.entity";
import { Role } from "src/infrastructure/database/entities/Role.entity";
import { Tenant } from "src/infrastructure/database/entities/Tenant.entity";
import { Permissions } from "src/infrastructure/database/entities/Permissions.entity";


import * as dotenv from 'dotenv';
import { Address } from "src/infrastructure/database/entities/Addresses.entity";
import { Phone } from "src/infrastructure/database/entities/Phone.entty";
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