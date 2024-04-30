import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    email: string
    @ApiProperty()
    senha: string

    constructor(email: string, senha: string) {
        this.email = email;
        this.senha = senha
    }
}