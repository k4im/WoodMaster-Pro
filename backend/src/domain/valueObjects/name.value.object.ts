import { ApiProperty } from "@nestjs/swagger";

export class Name { 
    @ApiProperty()
    FirsName: string
    @ApiProperty()
    LastName: string

    constructor(firstName:string, lastName: string) {
        this.FirsName = this.validateName(firstName)
        this.LastName = this.validateName(lastName)
    }

    private validateName(name: string) {
        var nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
        if(nameRegex.test(name)) return name;
        throw new Error(`O nome inserido é invalido. 
        Por favor insira um nome contendo apenas letras`)
    }
}