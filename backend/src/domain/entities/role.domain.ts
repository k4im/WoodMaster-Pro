import PermissionsVO from "../valueObjects/permission.value.object"

export default class RoleDomainEntity { 
    private Name: string
    private Permissions: PermissionsVO;
    
    constructor(name: string, permissions: PermissionsVO) {
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
    getActionPermissions(): string {
        return this.Permissions.Action
    }
}