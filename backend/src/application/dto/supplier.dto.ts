import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Address } from "src/domain/valueObjects/AddressVo/address.value.object";
import { Cpf } from "src/domain/valueObjects/cpfVo/cpf.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Name } from "src/domain/valueObjects/nameVo/name.value.object";
import { Phone } from "src/domain/valueObjects/phone.value.object";
import { RgDocument } from "src/domain/valueObjects/rgVo/rg.value.object";

export default class SupplierDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly Name: Name;
    @ApiProperty()
    @IsNotEmpty()
    readonly Email: Email;
    @ApiProperty({type: Address, isArray: true})
    @IsNotEmpty()
    readonly Addresses: Address[]
    @ApiProperty({type: Phone, isArray: true})
    @IsNotEmpty()
    readonly Phones: Phone[]
    @ApiProperty()
    @IsNotEmpty()
    readonly FathersName: Name
    @ApiProperty()
    @IsNotEmpty()
    readonly MothersName: Name 
    @ApiProperty()
    @IsNotEmpty()
    readonly Cpf: Cpf
    @ApiProperty()
    @IsNotEmpty()
    readonly Rg: RgDocument
    
    constructor(
        name: Name, 
        email: Email, 
        address: Address[], 
        phone: Phone[], 
        fathersName: Name, 
        mothersName: Name,
        cpf: Cpf,
        rg: RgDocument,
    ) {
         this.Name = name;
         this.Email = email
         this.Addresses = address;
         this.Phones = phone;
         this.FathersName = fathersName;
         this.MothersName = mothersName;
         this.Cpf = cpf
         this.Rg = rg
    }
}