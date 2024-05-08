import { ApiProperty } from "@nestjs/swagger";
import { ExceptionMsgs } from "src/domain/enum/exceptions.enum";

export class Email { 

    @ApiProperty()
    readonly email: string

    constructor(email: string) { 
        this.email = this.validacaoEmail(email);
    }
    
    /**
     * Estará recebendo o endeçore de email que será validado para construção do objecto.
     * @param email recebe o endereço de email que será repassado via construtor.
     * @returns email | error
     */
    private validacaoEmail(email: string) {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(regexEmail.test(email)) return email;
        throw new Error(ExceptionMsgs.email);
    }
}