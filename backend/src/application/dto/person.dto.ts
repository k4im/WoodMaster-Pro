import { IPersonDto } from "./interfaces/Person.dto";

export class FindPersonDto implements IPersonDto {
    Uuid: string;
    Name: string;
    isActive: boolean;
    Tenant: string;
}