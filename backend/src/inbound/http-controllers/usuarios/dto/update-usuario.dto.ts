import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Email } from '../../../../core/models/valueObjects/email.value.object';

export class UpdateUsuarioDto{
    @ApiProperty()
    Email: Email
    @ApiProperty()
    Senha: string
    @ApiProperty()
    Inativo: boolean = false
    @ApiProperty()
    Role: number

    constructor(email: Email, senha: string, inativo: boolean, role: number) {
        this.Email = email,
        this.Senha = senha
        this.Inativo = inativo
        this.Role = role
    }
}
