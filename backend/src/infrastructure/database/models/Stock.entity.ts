import { Column, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Products.entity,";
import { Tenant } from "./Tenant.entity";

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({unique: true, nullable: true})
    @Generated('uuid')
    Uuid: string
    
    @OneToMany(() => Product, (products) => products.Stock, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Products?: Product[] 
    
    @OneToOne(() => Tenant, (tenant) => tenant.Stock, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Tenant: Tenant
}