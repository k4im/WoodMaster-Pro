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