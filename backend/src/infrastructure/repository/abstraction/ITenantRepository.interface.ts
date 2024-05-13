import { IResponse } from "src/application/dto/IResponse.interface";
import { ITenantDto } from "src/application/dto/ITenant.dto";

export default interface ITenantRepository {
    paginatedTenants(page: number, limit: number) : Promise<IResponse<ITenantDto>>;
    findTenantByName(name: string): Promise<ITenantDto>;
    findTenantByUuid(uuid: string): Promise<ITenantDto>;
    createTenant(tenant: any): Promise<boolean>;
    deactiveTenant(uuid: string): Promise<boolean>;
}