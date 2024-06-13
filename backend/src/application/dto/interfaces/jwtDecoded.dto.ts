export interface jwtDecoded {
    Uuid: string,
    Role: string,
    Permissons: string,
    Tenant: string,
    UserAgent: string,
    Email?: string,
}