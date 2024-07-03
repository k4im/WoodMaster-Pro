/**
 * Classe utilizada para realizar a operaçao de 
 * passagem de dados em chamdas HTTP além de apresentação
 * dos schemas dentro do swagger.
 * 
 * A mesma classe encontra-se também sendo utilizada
 * para realizar a passagem de subjects do CASLJS.
 * 
 * @author João Victor.
 * 
 */
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../enum/roles.enum";
import { IsNotEmpty } from "class-validator";

export default class UserDto { 
    readonly IsActive: boolean = true;
    @ApiProperty()
    @IsNotEmpty()
    readonly Email: string;
    @ApiProperty()
    @IsNotEmpty()
    readonly Password: string;
    @ApiProperty()
    @IsNotEmpty()
    readonly Role: Role
    @ApiProperty()
    @IsNotEmpty()
    readonly PersonId: string
    
    constructor(
        email: string, 
        password: string, 
        role: Role,
        personId: string) {
        
            this.Email = email;
            this.Role = role;
            this.Password = password
            this.PersonId = personId;
        }
}