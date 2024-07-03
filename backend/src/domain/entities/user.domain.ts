/**
 * Entidade que resepresenta um determinado usuario
 * dentro do sistema.
 * 
 * @author João Victor.
 */
import { Email } from "../valueObjects/emailVo/email.value.object";
import RoleDomainEntity from "./role.domain";
import Password from "../valueObjects/PasswordVo/password.value.object";
import { Role } from "src/application/enum/roles.enum";

export default class UserDomanEntity {
    name: string
    readonly IsActive: boolean = true;
    readonly EmailAddr: Email;
    readonly Password: Password;
    readonly Role: RoleDomainEntity
    readonly PersonId: string
    
    constructor(
        email: string, 
        password: string, 
        role: Role,
        personId: string) {
            this.name = 'UserDomanEntity'
            this.EmailAddr = new Email(email);
            this.Role = new RoleDomainEntity(role);
            this.Password = new Password(password)
            this.PersonId = personId;
        }
}