import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")    
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
    
    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date

}