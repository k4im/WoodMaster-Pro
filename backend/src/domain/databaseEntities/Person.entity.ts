import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, Generated, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Address } from "./Addresses.entity";
import { Phone } from "./Phone.entty";
import { Tenant } from "./Tenant.entity";

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
    @Column({nullable: false, default: false})
    IsClient: boolean
    @Column({nullable: false, default: false})
    IsSupplier: boolean
    @Column({nullable: false, default: false})
    IsOperator: boolean
    @Column({nullable: false, default: false})
    IsCollaborator: boolean

    @OneToOne(()=> User, (user) => user.Person, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    @JoinColumn()
    User?: User
    
    @OneToMany(() => Address, (addr) => addr.Person, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Addresses: Address[]
    @OneToMany(() => Phone, (phone) => phone.Person, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Phones: Phone[]

    @ManyToOne(() => Tenant, (tenantId) => tenantId.Persons, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    @JoinColumn({name: "TenantId"})
    Tenant: Tenant

    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date

}