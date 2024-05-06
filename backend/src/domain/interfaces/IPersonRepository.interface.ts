import { IResponse } from "./IResponse.interface";
import { filter } from "../enum/filter.enum";
import { Person } from "src/adapters/framework/database/entities/Person.entity";
import PersonDomainEntity from "../entities/person.domain";

export default interface IPersonRepository { 
    paginateResults(page: number, limit: number, filterStatement: filter): Promise<IResponse<Person>>;
    
    createPerson(data: PersonDomainEntity): Promise<boolean>;
    
    updatePerson(data: PersonDomainEntity, uuid: string): Promise<boolean>;
    
    deactivePerson(uuid: string): Promise<boolean>;
}