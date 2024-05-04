import { Column, Entity, Generated, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person.entity";

@Entity()
export class Phone {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({nullable: true, type: "uuid", unique: true})
    @Generated("uuid")  
    @Index()  
    Uuid: string
    @Column({nullable: true})
    Phone: string
    @Column({nullable: false})
    IsPrimary: boolean

    @ManyToOne(() => Person, (person) => person.Phones)
    Person: Person
}