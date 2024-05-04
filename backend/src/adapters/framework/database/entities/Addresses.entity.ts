import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person.entity";

@Entity() 
export class Address {
    @PrimaryGeneratedColumn()
    Id: number
    @Column({type: 'uuid'})
    @Generated("uuid")
    Uuid: string
    @Column({nullable: true})
    StreetName: string
    @Column({nullable: true})
    City: string
    @Column({nullable: true})
    ZipCode: string
    @Column({nullable: true})
    Observations: string
    
    @ManyToOne(() => Person, (person) => person.Addresses)
    Person: Person
}