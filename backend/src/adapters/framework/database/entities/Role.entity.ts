import { randomUUID } from "crypto";
import { Column, Entity, Generated, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permissions } from "./Permissions.entity";
import { User } from "./User.entity";

@Entity()
export class Role { 
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")
    @Index()
    Uuid: string;
    @Column({nullable: false})
    Name: string
    @OneToMany(() => Permissions, (perm) => perm.Role)
    Permissions: Permissions[]

    @OneToMany(() => User, (user) => user.Role)
    User: User[]
}