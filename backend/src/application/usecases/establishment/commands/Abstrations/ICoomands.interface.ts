export interface ICommandInterface<T> {
    execute(data: T): Promise<boolean>; 
}

export interface ISimpleCommandInterface {
    execute(): Promise<boolean>; 
}

export interface ISingleCommandInterface<T> {
    execute(uuid: string): Promise<T>; 
}