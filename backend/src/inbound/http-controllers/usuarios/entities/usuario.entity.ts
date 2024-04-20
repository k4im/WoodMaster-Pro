import { ApiProperty } from "@nestjs/swagger";
import { Email } from "../../pessoas/entities/ValueObjects/email.value.object";
import { randomUUID } from "crypto";
import * as bcrypt from 'bcrypt';
import { CriarUsuarioDto } from "../dto/create-usuario.dto";

export class Usuario {
    Uuid: string
    
    @ApiProperty()
    PessoaId: number
    @ApiProperty()
    Email: Email
    @ApiProperty()
    Senha: string
    @ApiProperty()
    Inativo: boolean = false    
    @ApiProperty()
    EmpresaId: string
    @ApiProperty()
    Role: string

    constructor(pessoaId?: number, email?: Email, senha?: string, empresaId?: string, role?: string) {
        this.Uuid = randomUUID();
        this.PessoaId = pessoaId,
        this.Email = email,
        this.Senha = this.hashSenha(senha)
        this.EmpresaId
        this.Role = role
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
