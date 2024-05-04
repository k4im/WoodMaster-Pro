import { ApiProperty } from "@nestjs/swagger";

export class RgDocument { 
    @ApiProperty()
    Rg: string;

    constructor(rg: string) {
        this.Rg = this.validateInput(rg);
    }

    /**
     * Recebe o RG que será validado dentro do metodo.
     * @param rg Recebe o rg que será validado pelo metodo abaixo
     * @returns rg | Error
     */
    private validateInput(rg: string) { 
        const rgRegex = new RegExp("(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)");
        if(rgRegex.test(rg)) return rg;
        throw new Error(`O RG informado encontra-se invalido.
        Por favor informe um RG valido.`)
    }
}