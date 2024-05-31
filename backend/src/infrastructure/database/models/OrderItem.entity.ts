import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order.entity";

@Entity()
export default class OrderItem {
    @PrimaryGeneratedColumn()
    Id: number
    @Column({type: 'uuid', nullable: true})
    @Generated("uuid")
    Uuid: string
    @Column({nullable: false})
    Name: string
    @Column({type: 'decimal', nullable: false})
    Price: number
    @Column({nullable: false})
    Quantity: number

    @ManyToOne(() => Order, (o) => o.OrderItens, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    OrderId: Order

    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date
}