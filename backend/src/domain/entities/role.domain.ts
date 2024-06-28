import { ApiProperty } from "@nestjs/swagger";
import { Actions } from "../../application/enum/permissoes.enum";
import { Role } from "../../application/enum/roles.enum";

export default class RoleDomainEntity { 

    @ApiProperty()
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