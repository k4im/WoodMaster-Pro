/**
 * Entidade que representa uma pessoa dentro do sistema
 * através desta entidade é possivel estar criando pessoas
 * que estejam com o vinculo de cliente, colaborador ou fornecedor.
 * 
 * Portanto será possivel estar reutilizando a mesma entidade de dominio
 * para mapeamento de diversos tipos de pessoas dentro do sistema.
 * 
 * @author João Victor.
 */
import { Address } from "../valueObjects/AddressVo/address.value.object";
import { Email } from "../valueObjects/emailVo/email.value.object";
import { Phone } from "../valueObjects/phone.value.object";
import { Name } from "../valueObjects/nameVo/name.value.object";
import { Cpf } from "../valueObjects/cpfVo/cpf.value.object";
import { RgDocument } from "../valueObjects/rgVo/rg.value.object";

export default class PersonDomainEntity  { 
    readonly Name: Name;
    readonly Email: Email;
    readonly Addresses: Address[]
    readonly Phones: Phone[]
    readonly FathersName: Name
    readonly MothersName: Name 
    readonly Cpf: Cpf
    readonly Rg: RgDocument
    
    readonly IsClient: boolean;
    readonly IsSupplier: boolean;
    readonly IsOperator: boolean;
    readonly IsCollaborator: boolean;
    
    readonly IsActive: boolean = true;
    private Tenant: any; 

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
    /**
     * ira estar setando um tenant para a pessoa.
     * @param tenant Recebe um tenant para estar setando.
     */
    setTenant(tenant: any) {
        this.Tenant = tenant
    };

    
    /**
     * O metodo poderá ser utilizado para buscar 
     * um tenant presente na pessoa.
     * @returns Tenant
     */
    getTenant() {
        return this.Tenant
    }
}