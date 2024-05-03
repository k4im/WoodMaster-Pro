import { Inject, Injectable } from '@nestjs/common';
import { Tenant } from 'src/adapters/framework/database/entities/Tenant.entity';
import { IGenericRepository } from 'src/application/ports/out-ports/GenericRepository.gateway';

@Injectable()
export class ListTenantsUseCase {

    constructor(@Inject() private readonly repo: IGenericRepository<Tenant>) {}

    async execute(page: number, limit: number) {
        try {
            const selectStatament = {Uuid: true, Name: true};
            const result = this.repo.paginateResults(page, limit, selectStatament);
            return result;
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    
}
