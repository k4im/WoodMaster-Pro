import { Injectable } from "@nestjs/common";
import { Role } from "src/infrastructure/database/models/Role.entity";
import RoleDomainEntity from "src/domain/entities/role.domain";
import { EntityManager } from "typeorm";
import IRoleService from "./IRole.interface";

@Injectable()
export default class RoleService implements IRoleService  {
    
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
            const newRole = manager.getRepository(Role).create({
                Name: roleData.getName(),
            });
    
            await manager.getRepository(Role).save(newRole);
            return newRole;
        } else {
            return roleFromDatabase;
        }
    }

}