import { ApiProperty } from "@nestjs/swagger";
import RoleDomainEntity from "src/domain/entities/role.domain";
import Password from "src/domain/valueObjects/PasswordVo/password.value.object";
import { Email } from "src/domain/valueObjects/emailVo/email.value.object";

export default class UserDto { 
    readonly IsActive: boolean = true;
    @ApiProperty({type: Email})
    readonly EmailAddr: Email;
    @ApiProperty()
    readonly Password: Password;
    @ApiProperty({type: RoleDomainEntity})
    readonly Role: RoleDomainEntity
    @ApiProperty()
    readonly PersonId: string
    
    constructor(
        email: Email, 
        password: string, 
        role: RoleDomainEntity,
        personId: string) {
        
            this.EmailAddr = email;
            this.Role = role;
            this.Password = new Password(password)
            this.PersonId = personId;
        }
}