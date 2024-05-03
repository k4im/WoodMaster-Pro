import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product { 
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({type: 'uuid', nullable: true})
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
    
}