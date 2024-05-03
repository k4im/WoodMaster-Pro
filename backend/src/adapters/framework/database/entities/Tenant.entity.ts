import { randomUUID } from "crypto";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Tenant { 
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, default: () => randomUUID(), unique: true})
    Uuid: string;
    @Column({unique: true, nullable: false})
    AccessKey: string
    @Column({nullable: false})
    Name: string
    
    @ManyToOne(() => User, (usr) => usr.Tenant)
    Users: User[]

}