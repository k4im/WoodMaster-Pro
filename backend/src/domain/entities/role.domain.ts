import { Actions } from "../enum/permissoes.enum";
import PermissionsVO from "../valueObjects/permission.value.object"

export default class RoleDomainEntity { 
    private Name: string
    private Permissions: Actions[];
    
    constructor(name: string, permissions: Actions[]) {
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