export interface Addr {
    StreetName : string        
    City : string       
    Neighborhood: string            
    ZipCode: string    
    Country: string   
    State: string          
    Observations: string
}
export interface IPersonDto {
    Uuid: string, 
    Name: string, 
    isActive: boolean
    Tenant: string
    Email?: string
    Addresses?: Addr[] 
    Phones?: any[]
    FathersName?: string
    MothersName?: string
    Cpf?: string
    Rg?: string
}