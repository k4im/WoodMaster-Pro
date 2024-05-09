import { Injectable } from "@nestjs/common";
import { Permissions } from "src/adapters/framework/database/entities/Permissions.entity";
import { Role } from "src/adapters/framework/database/entities/Role.entity";
import RoleDomainEntity from "src/domain/entities/role.domain";
import { EntityManager } from "typeorm";

@Injectable()
export default class RoleService  {
    
    /**
     * O metodo estará verificando se o usuario existe no banco de dados
     * em caso positivio estará retornando o papel já existente,
     * em caso negativo estará criando um novo registro.
     * @param manager manager recebe o manager para efetuar a busca corretamente.
     * @param roleData recebe o Role para verificar se o mesmo já existe
     * @returns Role
     */
    async getOrCreateRole(manager: EntityManager, roleData: RoleDomainEntity): Promise<Role> {
        const roleFromDatabase = await manager.getRepository(Role).findOneBy({ Name: roleData.getName() }); 
        if (!roleFromDatabase) {
            const permissions = await this.createPermissions(manager, roleData.getActionPermissions());
            const newRole = manager.getRepository(Role).create({
                Name: roleData.getName(),
                Permissions: permissions
            });
    
            await manager.getRepository(Role).save(newRole);
            return newRole;
        } else {
            return roleFromDatabase;
        }
    }

    private async createPermissions(manager: EntityManager, actionPermissions: string[]): Promise<Permissions[]> {
        return await Promise.all(actionPermissions.map(async (action) => {
            const perm = manager.getRepository(Permissions).create({
                Action: action
            });
            return await manager.getRepository(Permissions).save(perm);
        }));
    }
}