import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./Role.entity";

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")    
    Uuid: string;
    @Column({nullable: false})
    Action: string;
    
    @ManyToOne(() => Role, (role) => role.Permissions, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Role: Role
    
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date

}