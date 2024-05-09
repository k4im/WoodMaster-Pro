import { ApiProperty } from "@nestjs/swagger";
import { Email } from "../valueObjects/emailVo/email.value.object";
import RoleDomainEntity from "./role.domain";
import * as bcrypt from 'bcrypt';

export default class UserDomanEntity {
    
    readonly IsActive: boolean = true;
    @ApiProperty({type: Email})
    readonly EmailAddr: Email;
    @ApiProperty()
    readonly Password: string;
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
            this.Password = this.hashPassword(password);
            this.PersonId = personId;
        }

    /**
     * Irá realizar o processo de gerar um hash para armazenar no banco de dados
     * @param password Recebe a senha para efetuar a criação do hash.
     * @returns string
     */
    private hashPassword(password: string) : string {
        return bcrypt.hashSync(password, bcrypt.genSaltSync());         
    }
}