import { Inject, Injectable } from '@nestjs/common';
import { Tenant } from 'src/adapters/framework/database/entities/Tenant.entity';
import { IGenericRepository } from 'src/application/ports/out-ports/GenericRepository.gateway';

@Injectable()
export class CreateNewTenantUseCase {

    constructor(@Inject() private readonly repo: IGenericRepository<Tenant>){}

    /**
     * 
     * @param tenant Recebe os dados para criar um novo Tenant
     * @returns true | false
     */
    async execute(tenant: Tenant) {
        try {
            const result = await this.repo.createRegister(tenant);
            return result;
        } catch (error) {
            console.log("Error: " + error)
        }
    }

}
