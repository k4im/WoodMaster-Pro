import { ExceptionMsgs } from "../../domain/enum/exceptions.enum";

export function PessoaExceptionValidate(error: any) { 
    switch (error) {
        case error.message === ExceptionMsgs.email:
            throw new Error(ExceptionMsgs.email);
        case error.message === ExceptionMsgs.ddd:
            throw new Error(ExceptionMsgs.ddd);
        case error.message === ExceptionMsgs.ddi:
            throw new Error(ExceptionMsgs.ddi)
        default:
            break;
    }
}