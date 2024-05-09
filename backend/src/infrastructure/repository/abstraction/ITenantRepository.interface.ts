export default interface ITenantRepository {
    paginatedTenants(page: number, limit: number);
    createTenant(tenant: any);
    deactiveTenant(uuid: string);
}