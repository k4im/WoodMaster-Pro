import { LoginDTO } from "src/application/dto/login.dto";

export interface ICommandCreatePerson<T, U> {
    execute(data: T, other: U): Promise<boolean>; 
}

export interface ICommandInterface<T> {
    execute(data: T): Promise<boolean>; 
}
export interface ICommandInterfacePaginate<T, U> {
    execute(data: T): Promise<U>; 
}

export interface ISimpleCommandInterface {
    execute(uuid?: string): Promise<boolean>; 
}

export interface ISingleCommandInterface<T> {
    execute(uuid: string, tenantId?: string): Promise<T>; 
}

export interface IAuthCommand{
    execute(email: string, senha: string, userAgent: string): Promise<string>; 
}

export interface IFindTenantByName<T> {
    execute(name: string): Promise<T>;     
}
export interface ILoginCommand {
    execute({email, password}: LoginDTO, userAgent: string);
}