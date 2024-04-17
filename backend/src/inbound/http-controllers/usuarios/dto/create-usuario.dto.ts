import { ApiProperty } from "@nestjs/swagger";
import { Email } from "../../pessoas/entities/ValueObjects/email.value.object";

export class CriarUsuarioDto {
    @ApiProperty()
    PessoaId: number
    @ApiProperty()
    Email: Email
    @ApiProperty()
    Senha: string
    @ApiProperty()
    Inativo: boolean

    constructor(pessoaId: number, email: Email, senha: string) {
        this.PessoaId = pessoaId,
        this.Email = email,
        this.Senha = senha
        this.Inativo = false
    }
    
}
