import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Person { 

    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")    
    Uuid: string
    @Column({nullable: true})
    Name: string
    @Column({nullable: false, unique: true})
    Email: string
    @Column({nullable: true})
    FathersName: string
    @Column({nullable: true})
    MothersName: string
    @Column({nullable: true, unique: true})
    Cpf: string
    @Column({nullable: true, unique: true})
    Rg: string
    @Column({nullable: false, default: true})
    isActive: boolean
    
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date

}