import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../valueObjects/address.value.object";
import { Email } from "../valueObjects/email.value.object";
import { Phone } from "../valueObjects/phone.value.object";
import { Name } from "../valueObjects/name.value.object";
import { Cpf } from "../valueObjects/cpf.value.object";

export class PersonDomainEntity { 
    @ApiProperty({type: Name})
    Name: Name;
    @ApiProperty()
    Email: Email;
    @ApiProperty({isArray: true, type: Address})
    Addresses: Address[]
    @ApiProperty({isArray: true, type: Phone})
    Phones: Phone[]
    @ApiProperty({type: Name})
    FathersName: Name
    @ApiProperty({type: Name})
    MothersName: Name 
    @ApiProperty({type: Cpf})
    Cpf: Cpf

}