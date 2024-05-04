import { Column, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Products.entity,";
import { Tenant } from "./Tenant.entity";

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({type: 'uuid', nullable: true})
    @Generated('uuid')
    Uuid: string
    
    @OneToMany(() => Product, (products) => products.Stock)
    Products?: Product[] 
    
    @OneToOne(() => Tenant, (tenant) => tenant.Stock)
    Tenant: Tenant
}