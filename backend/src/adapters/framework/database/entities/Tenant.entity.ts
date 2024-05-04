import { Column, Entity, Generated, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stock } from "./Stock.entity";
import { User } from "./User.entity";

@Entity()
export class Tenant { 
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")    
    Uuid: string;
    @Column({nullable: false})
    Name: string
    @Column({default: true})
    IsActive: boolean

    @OneToOne(() => Stock)
    @JoinColumn()
    Stock: Stock
    
    @OneToMany(() => User, (user) => user.Tenant)
    User?: User[]
}