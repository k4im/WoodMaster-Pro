import { ApiProperty } from "@nestjs/swagger";
import { Email } from "../valueObjects/emailVo/email.value.object";
import Password from "../valueObjects/PasswordVo/password.value.object";

export default class TenantDomainEntity { 
    @ApiProperty()
    Name: string
    Email: Email
    Password: Password
    IsActive: boolean = true;

    constructor(name: string, email: string, password: string) {
        this.Name = name;
        this.Email = new Email(email)
        this.Password = new Password(password)
    }
}