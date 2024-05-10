import { ApiProperty } from "@nestjs/swagger";
import { Actions } from "../../application/enum/permissoes.enum";
import { Role } from "../../application/enum/roles.enum";

export default class RoleDomainEntity { 

    @ApiProperty()
    private Name: Role
    @ApiProperty()
    private Permissions: Actions[];
    
    constructor(name: Role, permissions: Actions[]) {
        this.Name = name;
        this.Permissions = permissions;
    }

    /**
     * O metodo poderá ser utilizado para efetuar acesso ao nome do Role
     * @returns string
     */
    getName(): string {
        return this.Name;
    }

    /**
     * Metodo podera ser utilizado para buscar as ações atribuidas em uma permissão
     * @returns string
     */
    getActionPermissions(): Actions[] {
        return this.Permissions
    }
}