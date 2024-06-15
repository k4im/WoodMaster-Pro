import { Column, Entity, Generated, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stock } from "./Stock.entity";

@Entity()
export class Product { 
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({collation: 'utf8_general_ci', unique: true, nullable: true})
    @Generated('uuid')
    Uuid: string
    @Column({nullable: false})
    Name: string
    @Column({type: 'decimal', nullable: false})
    Price: number
    @Column({nullable: false})
    TotalItens: number
    @Column({nullable:true})
    BarCode: string
    @Column({nullable:true})
    Column: string
    @Column({nullable:true})
    Shelf: string
    
    @ManyToOne(()=> Stock, (stock) => stock.Products, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Stock: Stock
}