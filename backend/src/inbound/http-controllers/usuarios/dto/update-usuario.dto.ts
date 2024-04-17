import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Email } from '../../pessoas/entities/ValueObjects/email.value.object';

export class UpdateUsuarioDto{
    @ApiProperty()
    Email: Email
    @ApiProperty()
    Senha: string
    @ApiProperty()
    Inativo: boolean = false

    constructor(email: Email, senha: string, inativo: boolean) {
        this.Email = email,
        this.Senha = senha
        this.Inativo = inativo
    }
}
