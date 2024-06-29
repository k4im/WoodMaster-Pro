import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { IPersonDto } from "src/application/dto/interfaces/Person.dto";
import { filter } from "src/application/enum/filter.enum";
import PersonDomainEntity from "src/domain/entities/person.domain";

export default interface IPersonRepository { 
    paginateResults(page: number, limit: number, tenatnId: string, filterStatement: filter): Promise<IResponse<IPersonDto>>;
    
    createPerson(data: PersonDomainEntity): Promise<boolean>;
    
    findPersonByUuid(uuid: string, tenantId: string): Promise<IPersonDto>;

    updatePerson(data: PersonDomainEntity, uuid: string): Promise<boolean>;
    
    deactivePerson(uuid: string): Promise<boolean>;
    reactivatePerson(uuid: string): Promise<boolean>;
}