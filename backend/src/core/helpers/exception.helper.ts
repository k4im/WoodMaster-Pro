import { ExceptionMsgs } from "../enum/exceptions.enum";
import { EmailException } from "../exceptions/email.exceptio";
import { Email } from "../models/valueObjects/email.value.object";

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