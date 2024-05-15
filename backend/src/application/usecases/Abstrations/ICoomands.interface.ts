export interface ICommandInterface<T> {
    execute(data: T): Promise<boolean>; 
}
export interface ICommandInterfacePaginate<T, U> {
    execute(data: T): Promise<U>; 
}

export interface ISimpleCommandInterface {
    execute(): Promise<boolean>; 
}

export interface ISingleCommandInterface<T> {
    execute(uuid: string, tenantId?: string): Promise<T>; 
}