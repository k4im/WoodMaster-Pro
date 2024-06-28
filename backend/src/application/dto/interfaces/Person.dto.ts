export interface IPersonDto {
    Uuid: string, 
    Name: string, 
    isActive: boolean
    Tenant: string
    Email?: string
    Addresses?: any[]
    Phones?: any[]
    FathersName?: string
    MothersName?: string
    Cpf?: string
    Rg?: string
}