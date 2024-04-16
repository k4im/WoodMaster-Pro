import { ApiProperty } from "@nestjs/swagger"
import { CustomLogger } from "src/helpers/logger/logger.service"

interface ITelefone { 
    Telefone : string
    Ddi : string       
    Ddd : string      
    Ramal: string 
    Telefonoprincipal: boolean
}
export class Telefone { 
    
    @ApiProperty()
    Telefone : string
    @ApiProperty()
    Ddi : string       
    @ApiProperty()
    Ddd : string      
    @ApiProperty()
    Ramal: string 
    @ApiProperty()
    Telefonoprincipal: boolean

    constructor( 
        telefone?: string,
        ddi? : string,       
        ddd? : string,     
        ramal?: string, 
        telefonoprincipal?: boolean) {
            this.Telefone = this.validarTelefone(telefone),
            this.Ddi = this.validarDdi(ddi),
            this.Ddd = this.validarDDD(ddd),
            this.Ramal = ramal, 
            this.Telefonoprincipal = telefonoprincipal
        }


    /**
     * Metodo será utilizado para validação dos numeros de telefone informados.
     * @param telefone recebe o telefone que será utilizado no construtor.
     * @returns telefone valido | error.
     */
    validarTelefone(telefone: string) {
        // const regexTelefoneBrasileiro = /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/;
        // if(regexTelefoneBrasileiro.test(telefone)) 
        return telefone
        throw new Error("O telefone não é valido.")
    }

    /**
     *  Metodo será utilizado para validação dos numeros de DDI informados.
     * @param ddi recebe o ddi de discagem que será utilizado no construtor.
     * @returns DDI | error
     */
    validarDdi(ddi: string) {
        // const regexDDIBrasileiro = /^(?:\+|00)?(?:55)\d{2}$/;
        // if(regexDDIBrasileiro.test(ddi)) 
        return ddi
        throw new Error("O DDI informado é invalido.")
        
    }
    
    /**
     *  Metodo será utilizado para validação dos numeros de DDD informados.
     * @param ddd recebe o DDD de discagem que será utilizado no construtor.
     * @returns DDD | error
     */
    validarDDD(ddd: string) {
        // const regexDDD = /^[1-9]{2}$/;
        // if(regexDDD.test(ddd)) 
        return ddd
        throw new Error("O DDD informado é invalido.")
    }
    /**
     * Este metodo poderá estar sendo utilizado para criação de um telefone
     * com configurações padrão, podendo ser utilizado para criação de testes.
     * @returns Retorna um Telefone.
     */
    default() {
        let telefone: Telefone  = new Telefone("49 9954 4194",
        "555",
        "55", "5555", true)
        return telefone
    }

}