/**
 * Entidade que representa um papel dentro do sistema.
 * 
 * Através desta entidade será possivel estar realizando
 * a apresentação de determinados papeis dentro do sistema.
 * 
 * @author João Victor.
 */
import { Role } from "../../application/enum/roles.enum";

export default class RoleDomainEntity { 

    private Name: Role
    
    constructor(name: Role) {
        this.Name = name;
    }

    /**
     * O metodo poderá ser utilizado para efetuar acesso ao nome do Role
     * @returns string
     */
    getName(): string {
        return this.Name;
    }
}