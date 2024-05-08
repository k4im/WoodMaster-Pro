import { Email } from "../valueObjects/emailVo/email.value.object";
import RoleDomainEntity from "./role.domain";
import * as bcrypt from 'bcrypt';

export default class UserDomanEntity {
    
    readonly IsActive: boolean = true;
    readonly EmailAddr: Email;
    readonly HashPassword: string;
    readonly Role: RoleDomainEntity
    
    constructor(
        email: Email, 
        password: string, 
        role: RoleDomainEntity) {
        
            this.EmailAddr = email;
            this.Role = role;
            this.HashPassword = this.hashPassword(password);
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