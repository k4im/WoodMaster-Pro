import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person.entity";

@Entity()
export class Phone {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")    
    Uuid: string
    @Column({nullable: true})
    Phone: string
    @Column({nullable: false})
    IsPrimary: boolean

    @ManyToOne(() => Person, (person) => person.Phones)
    Person: Person
}