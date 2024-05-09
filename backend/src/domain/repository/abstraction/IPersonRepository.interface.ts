import { IResponse } from "../../dto/IResponse.interface";
import { filter } from "../../enum/filter.enum";
import PersonDomainEntity from "../../entities/person.domain";
import { IPersonDto } from "../../dto/Person.dto";

export default interface IPersonRepository { 
    paginateResults(page: number, limit: number, tenatnId: string, filterStatement: filter): Promise<IResponse<IPersonDto>>;
    
    createPerson(data: PersonDomainEntity): Promise<boolean>;
    
    findPersonByUuid(uuid: string, tenantId: string): Promise<IPersonDto>;

    updatePerson(data: PersonDomainEntity, uuid: string): Promise<boolean>;
    
    deactivePerson(uuid: string): Promise<boolean>;
}