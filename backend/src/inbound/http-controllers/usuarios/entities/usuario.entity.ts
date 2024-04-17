import { ApiProperty } from "@nestjs/swagger";
import { Email } from "../../pessoas/entities/ValueObjects/email.value.object";
import { randomUUID } from "crypto";

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

    constructor(pessoaId: number, email: Email, senha: string) {
        this.Uuid = randomUUID();
        this.PessoaId = pessoaId,
        this.Email = email,
        this.Senha = this.hashSenha(senha)
    }
    
    /**
     * O metodo será utilizando para efetuar o hash de password
     * onde estará criptografando a senha para posteriormente
     * salver em banco.
     * @param pwd Recebe a senha valida do input
     */
    hashSenha(pwd: string) {
        // TODO
        return ""
    }
}
