"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor(email) {
        this.email = this.validacaoEmail(email.email);
    }
    validacaoEmail(email) {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regexEmail.test(email))
            return email;
        throw new Error("Email invalido, por favor insira um valor valido.");
    }
}
exports.Email = Email;
//# sourceMappingURL=email.value.object.js.map