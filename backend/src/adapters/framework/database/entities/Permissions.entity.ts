import { Column, CreateDateColumn, Entity, Generated, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./Role.entity";
import { Actions } from "src/domain/enum/permissoes.enum";

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")    
    Uuid: string;
    @Column({nullable: false})
    Action: string;
    
    @ManyToOne(() => Role, (role) => role.Permissions)
    Role: Role
    
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date

}