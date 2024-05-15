import { Address } from "src/domain/valueObjects/AddressVo/address.value.object";
import { Cpf } from "src/domain/valueObjects/cpfVo/cpf.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Name } from "src/domain/valueObjects/nameVo/name.value.object";
import { Phone } from "src/domain/valueObjects/phone.value.object";
import { RgDocument } from "src/domain/valueObjects/rgVo/rg.value.object";

export default class CollaboratorDto {
    readonly Name: Name;
    readonly Email: Email;
    readonly Addresses: Address[]
    readonly Phones: Phone[]
    readonly FathersName: Name
    readonly MothersName: Name 
    readonly Cpf: Cpf
    readonly Rg: RgDocument
    
    readonly IsCollaborator: boolean = true

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