import { ApiProperty } from "@nestjs/swagger";
import { Email } from "../../pessoas/entities/ValueObjects/email.value.object";

export class CriarUsuarioDto {
    @ApiProperty()
    PessoaId: number
    @ApiProperty()
    Email: Email
    @ApiProperty()
    Senha: string
    Inativo: boolean
    @ApiProperty()
    EmpresaId: number
    @ApiProperty()
    Role: number
    constructor(pessoaId: number, email: Email, senha: string, empresaId: number, role: number) {
        this.PessoaId = pessoaId,
        this.Email = email,
        this.Senha = senha
        this.Inativo = false
        this.EmpresaId = empresaId
        this.Role = role
    }
    
}
