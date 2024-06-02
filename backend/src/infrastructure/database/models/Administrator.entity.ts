import { Column, CreateDateColumn, Entity, Generated, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Administrator {
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

    @CreateDateColumn()
    createAt: Date;
    @UpdateDateColumn()
    updateAt: Date

}