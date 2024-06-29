import { ApiProperty } from "@nestjs/swagger";
import RoleDomainEntity from "src/domain/entities/role.domain";
import Password from "src/domain/valueObjects/PasswordVo/password.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";
import { Role } from "../enum/roles.enum";

export default class UserDto { 
    readonly IsActive: boolean = true;
    @ApiProperty()
    readonly Email: string;
    @ApiProperty()
    readonly Password: string;
    @ApiProperty()
    readonly Role: Role
    @ApiProperty()
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