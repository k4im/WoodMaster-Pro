import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tenant { 
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")    
    Uuid: string;
    @Column({unique: true, nullable: false})
    AccessKey: string
    @Column({nullable: false})
    Name: string
}