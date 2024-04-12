"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telefone = void 0;
class Telefone {
    constructor(telefone, logger) {
        this.logger = logger;
        this.Telefone = this.validarTelefone(telefone.Telefone),
            this.Ddi = this.validarDdi(telefone.Ddi),
            this.Ddd = this.validarDDD(telefone.Ddd),
            this.Ramal = telefone.Ramal,
            this.Telefonoprincipal = telefone.Telefonoprincipal;
    }
    validarTelefone(telefone) {
        const regexTelefoneBrasileiro = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/;
        if (regexTelefoneBrasileiro.test(telefone))
            return telefone;
        this.logger.error("O Telefone informado é invalido.");
        throw new Error("O telefone não é valido.");
    }
    validarDdi(ddi) {
        const regexDDIBrasileiro = /^(?:\+|00)?(?:55)\d{2}$/;
        if (regexDDIBrasileiro.test(ddi))
            return ddi;
        this.logger.error("O DDI informado é invalido.");
        throw new Error("O DDI informado é invalido.");
    }
    validarDDD(ddd) {
        const regexDDD = /^[1-9]{2}$/;
        if (regexDDD.test(ddd))
            return ddd;
        this.logger.error("O DDD informado é invalido.");
        throw new Error("O DDD informado é invalido.");
    }
}
exports.Telefone = Telefone;
//# sourceMappingURL=telefone.value.object.js.map