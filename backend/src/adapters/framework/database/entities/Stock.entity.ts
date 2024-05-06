import { Column, Entity, Generated, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Products.entity,";
import { Tenant } from "./Tenant.entity";

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({type: 'uuid', nullable: true})
    @Generated('uuid')
    @Index()
    Uuid: string
    
    @OneToMany(() => Product, (products) => products.Stock, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Products?: Product[] 
    
    @OneToOne(() => Tenant, (tenant) => tenant.Stock, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Tenant: Tenant
}