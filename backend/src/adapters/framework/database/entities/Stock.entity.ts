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
    
    @OneToMany(() => Product, (products) => products.Stock)
    Products?: Product[] 
    
    @OneToOne(() => Tenant, (tenant) => tenant.Stock)
    Tenant: Tenant
}