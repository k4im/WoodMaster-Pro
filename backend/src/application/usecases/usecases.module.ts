import { Module } from '@nestjs/common';
import { ListTenantsUseCase } from './tenants/commands/list-tenants/list-tenants.service';
import { CreateNewTenantUseCase } from './tenants/commands/create-new-tenant/create-new-tenant.service';

@Module({
    providers: [
        ListTenantsUseCase,
        CreateNewTenantUseCase
    ]
})
export class UsecasesModule {}
