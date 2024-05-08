import { ApiProperty } from "@nestjs/swagger";
import { Address } from "../valueObjects/AddressVo/address.value.object";
import { Email } from "../valueObjects/email.value.object";
import { Phone } from "../valueObjects/phone.value.object";
import { Name } from "../valueObjects/name.value.object";
import { Cpf } from "../valueObjects/cpf.value.object";
import { RgDocument } from "../valueObjects/rg.value.object";
import { Tenant } from "src/adapters/framework/database/entities/Tenant.entity";

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
    private Tenant: Tenant; 

    constructor(
        name: Name, 
        email: Email, 
        address: Address[], 
        phone: Phone[], 
        fathersName: Name, 
        mothersName: Name,
        cpf: Cpf,
        rg: RgDocument,
        isClient?: boolean,
        isSupplier?: boolean,
        isOperator?: boolean,
        isCollaborator?: boolean
    ) {
         this.Name = name;
         this.Email = email
         this.Addresses = address;
         this.Phones = phone;
         this.FathersName = fathersName;
         this.MothersName = mothersName;
         this.Cpf = cpf
         this.Rg = rg
         this.IsClient = isClient;
         this.IsSupplier = isSupplier;
         this.IsOperator = isOperator;
         this.IsCollaborator = isCollaborator;
    }

    setTenant(tenant: Tenant) {
        this.Tenant = tenant
    };
    
    getTenant() {
        return this.Tenant
    }
}