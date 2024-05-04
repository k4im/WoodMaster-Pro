import { IResponse } from "./IResponse.interface";
import { filter } from "../enum/filter.enum";
import PersonDomainEntity from "../entities/person.domain";
import { Person } from "src/adapters/framework/database/entities/Person.entity";

export default interface IPersonRepository { 
    paginateResults(page: number, limit: number, filterStatement: filter): Promise<IResponse<Person>>;
    
    createClientPerson(data: PersonDomainEntity): Promise<void>;
    createSupplierPerson(data: PersonDomainEntity): Promise<void>;
    createOperatorPerson(data: PersonDomainEntity): Promise<void>;
    createCollaboratorPerson(data: PersonDomainEntity): Promise<void>;
    
    updateClientPerson(data: PersonDomainEntity, uuid: string): Promise<void>;
    updateOperatorPerson(data: PersonDomainEntity, uuid: string): Promise<void>;
    updateCollaboratorPerson(data: PersonDomainEntity, uuid: string): Promise<void>;
    updateSupplierPerson(data: PersonDomainEntity, uuid: string): Promise<void>;
    
    deactivePerson(uuid: string): Promise<void>;
}