import { ApiProperty } from "@nestjs/swagger"

export class CreateTenantDto {
    
    @ApiProperty()
    Nome: string

    constructor(nome?: string) {
        this.Nome = nome
    }
}
