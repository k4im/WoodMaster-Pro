export interface AdmPayloadToken {
    Uuid: string,
    Email: string,
    Role: string,
    UserAgent: string,
}

export interface UserPayloadToken {
    Uuid: string,
    Role: string,
    Tenant: string,
    UserAgent: string,
    Email: string
}