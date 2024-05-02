import { ExceptionMsgs } from "../../domain/enum/exceptions.enum";
import { EmailException } from "../../domain/exceptions/email.exceptio";

export function PessoaExceptionValidate(error: any) { 
    switch (error) {
        case error.message === ExceptionMsgs.email:
            throw new EmailException(ExceptionMsgs.email);
        case error.message === ExceptionMsgs.ddd:
            throw new Error(ExceptionMsgs.ddd);
        case error.message === ExceptionMsgs.ddi:
            throw new Error(ExceptionMsgs.ddi)
        default:
            break;
    }
}