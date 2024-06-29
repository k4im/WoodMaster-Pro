
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { ITenantDto } from "src/application/dto/interfaces/ITenant.dto";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";

export default interface ITenantRepository {
    paginatedTenants(page: number, limit: number) : Promise<IResponse<ITenantDto>>;
    findTenantByName(name: string): Promise<ITenantDto>;
    findTenantByUuid(uuid: string): Promise<Tenant>;
    createTenant(tenant: any): Promise<boolean>;
    deactiveTenant(uuid: string): Promise<boolean>;
    reactivateTenant(uuid: string): Promise<boolean>;
    updateTenantName(uuid: string, name: string): Promise<boolean>;
}