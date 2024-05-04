import { ApiProperty } from "@nestjs/swagger"

export class Phone { 
    
    @ApiProperty()
    Phone : string
    @ApiProperty()
    IsPrimary: boolean

    constructor( 
        phone?: string,
        isPrimary?: boolean) {
            this.Phone = phone;
            this.IsPrimary = isPrimary;
        }
}