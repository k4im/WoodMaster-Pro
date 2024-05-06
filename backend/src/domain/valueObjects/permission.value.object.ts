import { Actions } from "../enum/permissoes.enum";

export default class PermissionsVO { 
    readonly Action: string

    constructor(action: Actions) {
        this.Action = action
    }

    
}