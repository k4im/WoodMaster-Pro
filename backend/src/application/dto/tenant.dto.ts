import { DomainEntity } from "../../domain/types/entity.type";
import { newTenantDto } from "./interfaces/ITenant.dto";

export class TenantDto extends DomainEntity implements newTenantDto {
    Name: string;
    Email: string;
    Password: string;
    constructor() {
        super()
        this.name = 'TenantDto'
    }
}