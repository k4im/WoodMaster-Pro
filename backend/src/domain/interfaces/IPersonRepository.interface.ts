import { IResponse } from "./IResponse.interface";
import { filter } from "../enum/filter.enum";
import { Person } from "src/adapters/framework/database/entities/Person.entity";

export default interface IPersonRepository { 
    paginateResults(page: number, limit: number, filterStatement: filter): Promise<IResponse<Person>>;
    
    createClientPerson(data: Person): Promise<void>;
    createSupplierPerson(data: Person): Promise<void>;
    createOperatorPerson(data: Person): Promise<void>;
    createCollaboratorPerson(data: Person): Promise<void>;
    
    updateClientPerson(data: Person, uuid: string): Promise<void>;
    updateOperatorPerson(data: Person, uuid: string): Promise<void>;
    updateCollaboratorPerson(data: Person, uuid: string): Promise<void>;
    updateSupplierPerson(data: Person, uuid: string): Promise<void>;
    
    deactivePerson(uuid: string): Promise<void>;
}