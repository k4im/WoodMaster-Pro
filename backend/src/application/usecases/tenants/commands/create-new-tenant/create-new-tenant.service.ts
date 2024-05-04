import { Inject, Injectable } from '@nestjs/common';
import { Tenant } from 'src/adapters/framework/database/entities/Tenant.entity';
import { DatabaseGateway } from 'src/application/ports/out-ports/database.gateway';

@Injectable()
export class CreateNewTenantUseCase {

    constructor(@Inject("DatabaseGateway") private readonly databaseAdapter: DatabaseGateway){}

    /**
     * 
     * @param tenant Recebe os dados para criar um novo Tenant
     * @returns true | false
     */
    async execute(tenant: Tenant) {
        try {
            const repo = (await (await this.databaseAdapter.connect()).initialize()).getRepository(Tenant); 
            repo.create(tenant)
            return true;
        } catch (error) {
            console.log("Error: " + error)
        }
    }

}
