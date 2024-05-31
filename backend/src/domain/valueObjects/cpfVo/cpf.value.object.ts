import { ApiProperty } from "@nestjs/swagger";

export class Cpf { 
    @ApiProperty()  
    readonly value: string
    
    constructor(cpf: string) {
        this.value = this.validarInput(cpf);
    }

    /**
     * O metodo estará garantindo que o input repassado trata-se de um input valido
     * além de ser um input que não encontra-se com todos os valores repetidos.
     * @param cpf Recebe o valor do CPF para efetuar a validação.
     * @returns 
     */
    private validarInput(cpf: string) {
        const regexDigitosIguais = /^(\d)\1{10}$/;
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if(cpfRegex.test(cpf)) 
            throw new Error("O CPF deverá ser composto apenas de numero.")
        const cleanCPF = cpf.replace(/\D/g, '');
        if(regexDigitosIguais.test(cleanCPF)) 
            throw new Error("Todos os digitos do cpf não podem ser iguais.")
        if(this.validarCpf(cleanCPF)) return cleanCPF;
        throw new Error("Cpf não é valido.") 
    }

    /**
     * O metodo sera utilizado para realizar a validação dos digitos presentes no cpf limpo
     * caso os dados sejam validos será retornado o valor true. 
     * @param cpf recebe o cpf limpo para efetuar a validação dos digitos presentes.
     * @returns true | false
     */
    private validarCpf(cpf: string) { 
        let sum  = 0;
        let remainder: number;
        
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf[i - 1]) * (11 - i);
          }
      
        remainder = (sum * 10) % 11;
      
        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }
      
        if (remainder !== parseInt(cpf[9])) {
          return false;
        }
      
        sum = 0;
      
        for (let i = 1; i <= 10; i++) {
          sum += parseInt(cpf[i - 1]) * (12 - i);
        }
      
        remainder = (sum * 10) % 11;
      
        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }
      
        if (remainder !== parseInt(cpf[10])) {
          return false;
        }
      
          // CPF válido
          return true;
    }
}