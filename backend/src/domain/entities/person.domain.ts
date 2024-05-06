import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../valueObjects/address.value.object";
import { Email } from "../valueObjects/email.value.object";
import { Phone } from "../valueObjects/phone.value.object";
import { Name } from "../valueObjects/name.value.object";
import { Cpf } from "../valueObjects/cpf.value.object";
import { RgDocument } from "../valueObjects/rg.value.object";

export default class PersonDomainEntity  { 
    @ApiProperty({type: Name})
    readonly Name: Name;
    @ApiProperty()
    readonly Email: Email;
    @ApiProperty({isArray: true, type: Address})
    readonly Addresses: Address[]
    @ApiProperty({isArray: true, type: Phone})
    readonly Phones: Phone[]
    @ApiProperty({type: Name})
    readonly FathersName: Name
    @ApiProperty({type: Name})
    readonly MothersName: Name 
    @ApiProperty({type: Cpf})
    readonly Cpf: Cpf
    @ApiProperty({type: RgDocument})
    readonly Rg: RgDocument
    
    readonly IsClient: boolean;
    readonly IsSupplier: boolean;
    readonly IsOperator: boolean;
    readonly IsCollaborator: boolean;
    
    readonly IsActive: boolean = true;

    constructor(
        name: Name, 
        email: Email, 
        address: Address[], 
        phone: Phone[], 
        fathersName: Name, 
        mothersName: Name,
        cpf: Cpf,
        rg: RgDocument,
        isClient: boolean,
        isSupplier: boolean,
        isOperator: boolean,
        isCollaborator: boolean
    ) {
         this.Name = new Name(name.FirsName, name.LastName);
         this.Email = new Email(email.email);
         this.Addresses = address;
         this.Phones = phone;
         this.FathersName = new Name(fathersName.FirsName, fathersName.LastName);
         this.MothersName = new Name(mothersName.FirsName, mothersName.LastName);
         this.Cpf = new Cpf(cpf.cpf);
         this.Rg = new RgDocument(rg.Rg);
         this.IsClient = isClient;
         this.IsSupplier = isSupplier;
         this.IsOperator = isOperator;
         this.IsCollaborator = isCollaborator;
    }
}