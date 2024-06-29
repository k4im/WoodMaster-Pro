import { IsNotEmpty } from "class-validator";
import { DomainEntity } from "../../domain/types/entity.type";
import { newTenantDto } from "./interfaces/ITenant.dto";

export class TenantDto extends DomainEntity implements newTenantDto {
    @IsNotEmpty()
    Name: string;
    @IsNotEmpty()
    Email: string;
    @IsNotEmpty()
    Password: string;
    constructor() {
        super()
        this.name = 'TenantDto'
    }
}