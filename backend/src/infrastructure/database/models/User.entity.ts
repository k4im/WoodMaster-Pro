import { Column, CreateDateColumn, Entity, Generated, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./Role.entity";
import { Person } from "./Person.entity";
import { Tenant } from "./Tenant.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")
    Uuid: string
    @Column({nullable: true, default: true})
    IsActive: boolean;
    @Column({nullable: false, unique: true})
    EmailAddr: string;
    @Column({nullable: false})
    HashPassword: string;
    
    @ManyToOne(() => Role, (role) => role.User, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Role: Role
    @OneToOne(() => Person, (person) => person.User, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Person: Person
    @ManyToOne(() => Tenant, (tenant) => tenant.User, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    @JoinColumn({name: "TenantId"})
    Tenant: Tenant

    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date

}