import { randomUUID } from "crypto";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({default: () => randomUUID(), unique: true})
    Uuid: string;
    @Column({nullable: false})
    Action: string;
    @ManyToOne(() => User, (usr) => usr.Permissions)
    User: User

    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date

}