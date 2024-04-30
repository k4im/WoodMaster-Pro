import { ApiProperty } from "@nestjs/swagger";
import { ExceptionMsgs } from "src/domain/enum/exceptions.enum";
import { EmailException } from "src/domain/exceptions/email.exceptio";

export class Email { 

    @ApiProperty()
    email: string

    constructor(email: string) { 
        this.email = this.validacaoEmail(email);
    }
    
    /**
     * Estará recebendo o endeçore de email que será validado para construção do objecto.
     * @param email recebe o endereço de email que será repassado via construtor.
     * @returns email | error
     */
    validacaoEmail(email: string) {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(regexEmail.test(email)) return email;
        throw new EmailException(ExceptionMsgs.email);
    }
}