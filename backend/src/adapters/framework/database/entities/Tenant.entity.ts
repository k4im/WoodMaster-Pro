import { Column, Entity, Generated, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stock } from "./Stock.entity";
import { User } from "./User.entity";
import { Person } from "./Person.entity";

@Entity()
export class Tenant { 
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")
    @Index()  
    Uuid: string;
    @Column({nullable: false})
    Name: string
    @Column({default: true})
    IsActive: boolean

    @OneToOne(() => Stock, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    @JoinColumn()
    Stock: Stock
    
    @OneToMany(() => User, (user) => user.Tenant, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    User?: User[]
    
    @OneToMany(() => Person, (user) => user.Tenant, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Persons: Person[]
}