export interface IUserDto {
    Uuid: string,
    Email: string,
    IsActive: boolean,
    Role: string,
    Hash?: string,
    Tenant?: string,
    Permissions: string[]
}