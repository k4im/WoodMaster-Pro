import { Person } from "src/adapters/framework/database/entities/Person.entity";
import { Role } from "src/adapters/framework/database/entities/Role.entity";
import { User } from "src/adapters/framework/database/entities/User.entity";
import RoleDomainEntity from "src/domain/entities/role.domain";
import UserDomanEntity from "src/domain/entities/user.domain";
import { DataSource, EntityManager } from "typeorm";
import PermissionService from "./permissions.service";

export default class TransactionService {
    constructor(private readonly db: DataSource) {}

    async transactionCreateUser(data: UserDomanEntity): Promise<boolean> {
        return await this.db.manager.transaction(async (manager) => {
            const userRepo = manager.getRepository(User);
            const role = await this.getOrCreateRole(manager, data.Role);

            const person = await this.getPersonByUuid(manager, data.PersonId);

            const user = userRepo.create({
                EmailAddr: data.EmailAddr.email,
                Person: person,
                HashPassword: data.HashPassword,
                Tenant: person.Tenant,
                Role: role,
                IsActive: data.IsActive,
            });

            await userRepo.save(user);
            return true;
        }).catch((error) => {
            throw new Error(`Erro na transação: ${error}`);
        });
    }
    /**
     * O metodo estará verificando se o usuario existe no banco de dados
     * em caso positivio estará retornando o papel já existente,
     * em caso negativo estará criando um novo registro.
     * @param manager manager recebe o manager para efetuar a busca corretamente.
     * @param roleData recebe o Role para verificar se o mesmo já existe
     * @returns Role
     */
    private async getOrCreateRole(manager: EntityManager, roleData: RoleDomainEntity): Promise<Role> {
        const roleFromDatabase = await manager.getRepository(Role).findOneBy({ Name: roleData.getName() });
    
        if (!roleFromDatabase) {
            const permissionService = new PermissionService(manager);
            const permissions = await permissionService.createPermissions(roleData.getActionPermissions());
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

    /**
     * O metodo poderá ser utiilizado para efetuar a busca de uma pessoa partindo
     * do UUID fornecido.
     * @param manager recebe o manager para efetuar a busca corretamente.
     * @param personUuid recebe o uuid do cliente para realizar a busca a partir
     * @returns Person
     */
    private async getPersonByUuid(manager: EntityManager, personUuid: string): Promise<Person> {
        return await manager.getRepository(Person).findOne({ relations: ['Tenant'], where: { Uuid: personUuid } });
    }
}