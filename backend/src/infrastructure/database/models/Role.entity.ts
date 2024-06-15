import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Role { 
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, unique: true})
    @Generated("uuid")
    Uuid: string;
    @Column({nullable: false})
    Name: string

    @OneToMany(() => User, (user) => user.Role, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    User: User[]
}