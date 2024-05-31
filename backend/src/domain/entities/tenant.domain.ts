import { ApiProperty } from "@nestjs/swagger";

export default class TenantDomainEntity { 
    @ApiProperty()
    Name: string
    IsActive: boolean = true;

    constructor(name: string) {
        this.Name = name;
    }
}