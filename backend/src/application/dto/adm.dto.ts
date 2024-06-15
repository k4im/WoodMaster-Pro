import { ApiProperty } from "@nestjs/swagger"

export default class AdminDto {
    @ApiProperty()
    Email: string
    @ApiProperty()
    Password: string
    
    constructor(email: string, password: string) {
        this.Email = email,
        this.Password = password
    }
}