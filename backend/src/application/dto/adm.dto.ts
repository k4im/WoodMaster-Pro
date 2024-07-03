/**
 * Classe de DTO utilizada para apresentação
 * dentro do swagger.
 * 
 * Portanto estará sendo utilizada para receber o payload
 * da requisição partindo do frontend.
 * 
 * @author João Victor.
 */
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export default class AdminDto {
    @ApiProperty()
    @IsNotEmpty()
    Email: string
    @ApiProperty()
    @IsNotEmpty()
    Password: string
    
    constructor(email: string, password: string) {
        this.Email = email,
        this.Password = password
    }
}