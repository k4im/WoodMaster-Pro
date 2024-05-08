import { Permissions } from "src/adapters/framework/database/entities/Permissions.entity";
import { EntityManager } from "typeorm";

export default class PermissionService {
    constructor(private readonly manager: EntityManager) {}

    async createPermissions(actionPermissions: string[]): Promise<Permissions[]> {
        return await Promise.all(actionPermissions.map(async (action) => {
            const perm = this.manager.getRepository(Permissions).create({
                Action: action
            });
            return await this.manager.getRepository(Permissions).save(perm);
        }));
    }
}