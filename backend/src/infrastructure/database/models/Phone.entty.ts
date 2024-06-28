import { Column, Entity, Generated, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person.entity";

@Entity()
export class Phone {
    @PrimaryGeneratedColumn()
    Id?: number;
    @Column({nullable: true, unique: true})
    @Generated("uuid")  
    Uuid?: string
    @Column({nullable: true})
    Phone: string
    @Column({nullable: false})
    IsPrimary: boolean

    @ManyToOne(() => Person, (person) => person.Phones, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Person?: Person
}