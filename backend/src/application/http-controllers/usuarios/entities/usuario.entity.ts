import { ApiProperty } from "@nestjs/swagger";
import { Email } from "../../../../domain/valueObjects/email.value.object";
import { randomUUID } from "crypto";
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDto } from "../dto/create-usuario.dto";

export class Usuario {
    @ApiProperty()
    PessoaId: number
    @ApiProperty()
    Email: Email
    @ApiProperty()
    Senha: string
    @ApiProperty()
    Inativo: boolean = false    
    @ApiProperty()
    Role: string
    @ApiProperty()
    TenantId: string
    
    constructor(
        pessoaId?: number, 
        email?: Email, 
        senha?: string,
        role?: string, 
        tenant? : string) {
        this.PessoaId = pessoaId,
        this.Email = email,
        this.Senha = this.hashSenha(senha)
        this.Role = role,
        this.TenantId = tenant
    }
    
    /**
     * O metodo será utilizando para efetuar o hash de password
     * onde estará criptografando a senha para posteriormente
     * salver em banco.
     * @param pwd Recebe a senha valida do input
     */
    hashSenha(pwd: string) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(pwd, salt);
    }
}
