import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permissions } from "./Permissions.entity";
import { User } from "./User.entity";

@Entity()
export class Role { 
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")
    Uuid: string;
    @Column({nullable: false})
    Name: string
    @OneToMany(() => Permissions, (perm) => perm.Role, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Permissions: Permissions[]

    @OneToMany(() => User, (user) => user.Role, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    User: User[]
}