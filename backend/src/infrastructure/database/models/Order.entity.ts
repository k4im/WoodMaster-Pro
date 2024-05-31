import { Address } from "src/domain/valueObjects/AddressVo/address.value.object";
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrderItem from "./OrderItem.entity";
import { Tenant } from "./Tenant.entity";

@Entity()
export default class Order  {
    @PrimaryGeneratedColumn()
    Id: number
    @Column({type: 'uuid', nullable: true})
    @Generated("uuid")
    Uuid: string
    @Column({nullable: false})
    OrderType: string
    @Column({nullable: true, type: 'json'})
    DeliveryAddress: Address
    @Column({nullable: false})
    Status: string
    @Column({nullable: true})
    Observations: string
    
    @OneToMany(() => OrderItem, (ot) => ot.OrderId, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    OrderItens: OrderItem[]
    @ManyToOne(() => Tenant, (t) => t.Orders, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Tenant: Tenant

    @CreateDateColumn()
    createAt: Date
    @UpdateDateColumn()
    updateAt: Date
}