import { Role } from "src/domain/databaseEntities/Role.entity";
import RoleDomainEntity from "src/domain/entities/role.domain";
import { EntityManager } from "typeorm";

export default interface IRoleService  {
    getOrCreateRole(manager: EntityManager, roleData: RoleDomainEntity): Promise<Role>;
}