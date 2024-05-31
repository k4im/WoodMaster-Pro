import { ApiProperty } from "@nestjs/swagger";
import { Email } from "../valueObjects/emailVo/email.value.object";
import RoleDomainEntity from "./role.domain";
import Password from "../valueObjects/PasswordVo/password.value.object";

export default class UserDomanEntity {
    
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