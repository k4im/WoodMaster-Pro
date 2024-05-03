import { Module } from '@nestjs/common';
import { IGenericRepository } from '../ports/out-ports/GenericRepository.gateway';
import { Tenant } from 'src/adapters/framework/database/entities/Tenant.entity';
import { GenericRepository } from 'src/domain/repository/GenericRepository';
import { Person } from 'src/adapters/framework/database/entities/Person.entity';
import { User } from 'src/adapters/framework/database/entities/User.entity';
import { ListTenantsUseCase } from './tenants/commands/list-tenants/list-tenants.service';
import { CreateNewTenantUseCase } from './tenants/commands/create-new-tenant/create-new-tenant.service';

@Module({
    providers: [
        {provide: IGenericRepository<Tenant>, useClass: GenericRepository<Tenant>},
        {provide: IGenericRepository<Person>, useClass: GenericRepository<Person>},
        {provide: IGenericRepository<User>, useClass: GenericRepository<User>},
        ListTenantsUseCase,
        CreateNewTenantUseCase
    ]
})
export class UsecasesModule {}
