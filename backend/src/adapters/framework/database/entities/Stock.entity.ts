import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column({type: 'uuid', nullable: true})
    @Generated('uuid')
    Uuid: string
    @Column({nullable: false})
    Name: string

}