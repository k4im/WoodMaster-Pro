export abstract class IGenericRepository<T> {
    paginateResults(page: number, limit: number, selectState: any): Promise<T[]> {return};
    findRegister(whereStatement: any): Promise<T> {return};
    createRegister(data: any): Promise<boolean> {return};
    updateRegister(data: any, uuid: string): Promise<boolean> {return};
    deactivateRegister(uuid: string, data: any): Promise<boolean> {return};
}