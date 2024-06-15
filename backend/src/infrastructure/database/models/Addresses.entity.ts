import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "./Person.entity";

@Entity() 
export class Address {
    @PrimaryGeneratedColumn()
    Id?: number
    @Column({ nullable: true, collation: 'utf8_general_ci'})
    @Generated("uuid")
    Uuid?: string
    @Column({nullable: true})
    StreetName: string
    @Column({nullable: true})
    City: string
    @Column({nullable: true})
    Neighborhood: string
    @Column({nullable: true})
    ZipCode: string
    @Column({nullable: true})
    Country: string
    @Column({nullable: true})
    State: string
    @Column({nullable: true})
    Observations: string
    
    @ManyToOne(() => Person, (person) => person.Addresses, {onUpdate: "CASCADE", onDelete: "SET NULL"})
    Person?: Person
}