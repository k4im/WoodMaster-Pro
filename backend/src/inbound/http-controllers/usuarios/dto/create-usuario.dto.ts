import { ApiProperty } from "@nestjs/swagger";
import { Email } from "../../../../core/models/valueObjects/email.value.object";

export class CriarUsuarioDto {
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
        this.Senha = senha
        this.Role = role,
        this.TenantId = tenant
    }
    
}
