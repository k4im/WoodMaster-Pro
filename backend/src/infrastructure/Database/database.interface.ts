import { User } from "src/adapters/framework/database/entities/User.entity";
import { DataSource } from "typeorm";

export default interface IDatabaseService {
    openConnection(): Promise<DataSource>;
    closeConnection(db: DataSource): Promise<void>;
    paginateUsers(page: number, limit: number, tenantId: string): Promise<[User[], number]>;
}