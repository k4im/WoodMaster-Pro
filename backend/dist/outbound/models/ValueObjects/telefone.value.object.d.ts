import { CustomLogger } from "src/helpers/logger/logger.service";
export declare class Telefone {
    private logger;
    Telefone: string;
    Ddi: string;
    Ddd: string;
    Ramal: string;
    Telefonoprincipal: boolean;
    constructor(telefone: Telefone, logger: CustomLogger);
    validarTelefone(telefone: string): string;
    validarDdi(ddi: string): string;
    validarDDD(ddd: string): string;
}
