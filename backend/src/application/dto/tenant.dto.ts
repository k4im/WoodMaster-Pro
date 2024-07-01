import { IsNotEmpty } from "class-validator";
import { DomainEntity } from "../../domain/types/entity.type";
import { newTenantDto } from "./interfaces/ITenant.dto";

export class TenantDto extends DomainEntity implements newTenantDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    password: string;
    constructor() {
        super()
        this.name = 'TenantDto'
    }
}