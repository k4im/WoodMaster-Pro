import { randomUUID } from "crypto";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Permissions } from "./Permissions.entity";
import { Tenant } from "./Tenant.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, default: randomUUID(), unique: true})
    Uuid: string
    @Column({nullable: false, unique: true})
    AccessCode: string;
    @Column({nullable: true, default: true})
    IsActive: boolean;
    @Column({nullable: false, unique: true})
    EmailAddr: string;
    @Column({nullable: false})
    HashPassword: string;
    @Column({ nullable: true})
    @OneToMany(() => Permissions, (perm) => perm.User)
    Permissions: Permissions[]
    @OneToMany(() => Tenant, (perm) => perm.Users)
    Tenant: Tenant
    
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date

}