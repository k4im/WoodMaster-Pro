/**
 * Classe utilizada para passagem dos subjects
 * dentro do CASLJS.
 * 
 * @author João Victor.
 */
import { IPersonDto } from "./interfaces/Person.dto";

export class FindPersonDto implements IPersonDto {
    Uuid: string;
    Name: string;
    isActive: boolean;
    Tenant: string;
}