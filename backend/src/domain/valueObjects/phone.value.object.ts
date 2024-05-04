import { ApiProperty } from "@nestjs/swagger"

export class Phone { 
    
    @ApiProperty()
    readonly Phone : string
    @ApiProperty()
    readonly IsPrimary: boolean

    constructor( 
        phone?: string,
        isPrimary?: boolean) {
            this.Phone = phone;
            this.IsPrimary = isPrimary;
        }
}